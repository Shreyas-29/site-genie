# SiteGenie - Frontend

A website builder that allows you to create a website in minutes


## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: Zustand
- **UI Components**: Radix UI, Lucide Icons
- **Code Highlighting**: react-syntax-highlighter


## 🚀 Getting Started

1. Install dependencies:
    ```bash
    pnpm install
    ```

2. Install backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Set up environment variables:
    ```bash
    cp .env.example .env
    ```

4. Run the development server:
    ```bash
    pnpm dev
    #and
    uvicorn app.main:app --reload
    ```

5. Open http://localhost:3000 in your browser for frontend and http://localhost:8000 for backend


## 🌐 Environment Variables

- ### Frontend

Create a .env.local file in the root directory:

```env
NEXT_PUBLIC_APP_NAME="Site Genie"
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- ###  Backend

Create a .env file:
```env
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

