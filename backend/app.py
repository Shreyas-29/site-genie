from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(title="SiteGenie API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set")

genai.configure(api_key=GEMINI_API_KEY)

# Models
class WebsiteRequest(BaseModel):
    description: str
    style: Optional[str] = "modern"
    color_scheme: Optional[str] = "blue"

# System prompt for Gemini
SYSTEM_PROMPT = """You are a professional web developer. Generate a responsive HTML/CSS website based on the user's description.

Follow these guidelines:
1. Create a complete, valid HTML5 document with responsive design
2. Use modern CSS (Flexbox/Grid)
3. Include a clean, modern UI with good typography
4. Use the specified color scheme
5. Make it mobile-responsive
6. Include appropriate meta tags
7. Use semantic HTML5 elements
8. Include sample content that matches the description
9. Keep it simple and clean
10. Only return a JSON object with 'html' and 'css' keys

Example output format:
{
    "html": "<html>...</html>",
    "css": "body { ... }"
}"""

@app.get("/")
async def root():
    return {"message": "SiteGenie API is running", "status": "healthy"}

@app.post("/api/generate")
async def generate_website(request: WebsiteRequest):
    try:
        logger.info(f"Received generation request: {request}")
        
        # Prepare the prompt
        user_prompt = f"""
        Create a {request.style} website with a {request.color_scheme} color scheme.
        
        Description: {request.description}
        
        Please generate the HTML and CSS for this website.
        """
        
        # Initialize the model
        try:
            model = genai.GenerativeModel('gemini-2.0-flash')
            logger.info("Successfully initialized Gemini model")
        except Exception as e:
            logger.error(f"Failed to initialize Gemini model: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to initialize AI model: {str(e)}")
        
        # Generate content
        try:
            response = model.generate_content([SYSTEM_PROMPT, user_prompt])
            logger.info("Successfully generated content from Gemini")
        except Exception as e:
            logger.error(f"Error generating content: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error generating website: {str(e)}")
        
        # Parse the response
        try:
            # Try to extract JSON from the response
            response_text = response.text.strip()
            logger.debug(f"Raw response from Gemini: {response_text[:500]}...")  # Log first 500 chars
            
            # Sometimes the response might be wrapped in markdown code blocks
            if '```json' in response_text:
                json_str = response_text.split('```json')[1].split('```')[0].strip()
            elif '```' in response_text:
                json_str = response_text.split('```')[1].strip()
                if json_str.startswith('json'):
                    json_str = json_str[4:].strip()
            else:
                json_str = response_text
                
            # Parse the JSON
            website_data = json.loads(json_str)
            
            if not all(key in website_data for key in ['html', 'css']):
                raise ValueError("Response missing required fields 'html' or 'css'")
                
            return website_data
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {str(e)}\nResponse: {response_text}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to parse AI response. The AI might have returned an invalid format."
            )
        except Exception as e:
            logger.error(f"Error processing response: {str(e)}\nResponse: {response_text}")
            raise HTTPException(
                status_code=500, 
                detail=f"Error processing AI response: {str(e)}"
            )
            
    except HTTPException:
        # Re-raise HTTP exceptions as they are
        raise
    except Exception as e:
        logger.exception("Unexpected error in generate_website")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)