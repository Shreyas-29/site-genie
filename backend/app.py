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

# logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="SiteGenie API")

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set")
genai.configure(api_key=GEMINI_API_KEY)

# classes
class PageContent(BaseModel):
    html: str
    css: str

class WebsiteRequest(BaseModel):
    description: str
    style: Optional[str] = "modern"
    color_scheme: Optional[str] = "blue"
    generate_multiple_pages: Optional[bool] = False

class WebsiteResponse(BaseModel):
    pages: Dict[str, PageContent]

SYSTEM_PROMPT = """
    You are a professional web developer. Generate a multi-page responsive website based on the user"s description.

    For each page, include:
        1. A complete, valid HTML5 document
        2. Dedicated CSS for that page
        3. Responsive design using modern CSS (Flexbox/Grid)
        4. Clean, modern UI with good typography
        5. Mobile-responsive layout
        6. Semantic HTML5 elements
        7. Content that matches the page"s purpose

    Return a JSON object where each key is a page name (e.g., "home", "about") and each value is an object with "html" and "css" keys.

    Example format:
        {
            "home": {
                "html": "<!DOCTYPE html>...",
                "css": "body { ... }"
            },
            "about": {
                "html": "<!DOCTYPE html>...",
                "css": "body { ... }"
            }
        }
"""

# app
@app.get("/")
async def root():
    return {"message": "SiteGenie API is running", "status": "healthy"}

# generate website content
def generate_website_content(prompt: str, style: str, color_scheme: str, multi_page: bool = False) -> Dict[str, Any]:
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        
        user_prompt = f"""
            Create a {style} website with {color_scheme} color scheme.
            Description: {prompt}
        """
        
        if multi_page:
            user_prompt += "\n\nGenerate multiple pages for this website (e.g., home, about, contact)."
            system_prompt = SYSTEM_PROMPT
        else:
            user_prompt += "\n\nGenerate a single page website."
            system_prompt = "Generate a single page website with HTML and CSS."
        
        response = model.generate_content([
            {"role": "user", "parts": [system_prompt]},
            {"role": "model", "parts": ["I understand the task. Please provide the website description."]},
            {"role": "user", "parts": [user_prompt]}
        ])
        
        try:
            content = response.text.strip()
            if content.startswith("```json"):
                content = content[7:-3]
            return json.loads(content)
        except json.JSONDecodeError:
            logger.error("Failed to parse AI response as JSON")
            # logger.error(f"Raw response: {response.text}")
            raise ValueError("Failed to generate valid website content")
            
    except Exception as e:
        logger.error(f"Error generating website content: {str(e)}")
        raise

@app.post("/api/generate")
async def generate_website(request: WebsiteRequest):
    try:
        logger.info("Generating website...")
        
        result = generate_website_content(
            prompt=request.description,
            style=request.style,
            color_scheme=request.color_scheme,
            multi_page=request.generate_multiple_pages
        )
        
        # if single page, convert to multi-page
        if "html" in result and "css" in result:
            result = {"home": {"html": result["html"], "css": result["css"]}}
        
        # validate
        if not isinstance(result, dict) or not all(
            isinstance(v, dict) and "html" in v and "css" in v
            for v in result.values()
        ):
            raise ValueError("Invalid response format from AI model")
        
        return {"pages": result}
    
    except Exception as e:
        logger.error(f"Error in generate_website: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate website: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)