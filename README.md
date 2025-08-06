# SiteGenie - Frontend

A website builder that allows you to create a website in minutes
<img width="1280" height="720" alt="Site Genie Thumbnail" src="https://github.com/user-attachments/assets/d2e26583-dc12-44ca-82d8-3c98c1e111ff" />


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

### Upgrade pip
```
pip install --upgrade pip
```

### Install wheel first
```
pip install wheel
```

### Now install the requirements
```
pip install -r requirements.txt
```


### Create new virtual environment
```
python3 -m venv venv
```

### Activate virtual environment
```
source venv/bin/activate
```

