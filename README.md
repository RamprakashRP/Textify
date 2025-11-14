# **Textify** 📝

**AI-powered intelligent document Q&A agent**. Upload PDFs, Word docs, and emails to get instant answers with citations and confidence scores. Perfect for **insurance documents** and other structured/unstructured files.

----------

## **🚀 Features**

-   **Intelligent Document Processing**: PDF, DOCX, and email support with smart chunking
    
-   **RAG Architecture**: FAISS vector search + Azure OpenAI generation
    
-   **High-Performance Caching**: In-memory vector cache for instant retrieval
    
-   **Cloud Storage**: Supabase integration for persistent storage
    
-   **Global Search**: Cross-document search capabilities
    
-   **Concurrent Processing**: Parallel question processing for maximum throughput
    
-   **Production Ready**: Backend built with FastAPI, ready for cloud deployment
    

----------

## **📋 Technologies Used**

-   **Backend**: FastAPI, Python 3.9+, FAISS, Azure OpenAI, Supabase
    
-   **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn-ui, React Query, React Router
    

----------

## **📂 Folder Structure**
````
`.
├── backend/
│   ├── main.py
│   ├── supabase_utils.py
│   ├── requirements.txt
│   └── README_backend.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── README_frontend.md
└── README.md` 
````

----------

## **📋 Backend Installation**

### **Prerequisites**

-   Python 3.9+
    
-   Azure OpenAI API access
    
-   Supabase account with storage bucket
    

### **Steps**
````

`git clone https://github.com/your_username/textify.git cd textify/backend
pip install -r requirements.txt` 
````

### **Environment Variables**

Create a `.env` file with:
````

`VALID_TOKEN=your_secure_token_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_BUCKET=documents
ENVIRONMENT=production
DEBUG=false` 
````

----------

### **🏃 Running Backend**
````

`python main.py # or with uvicorn uvicorn main:app --host 0.0.0.0 --port 8000 --reload` 
````

----------

## **🌐 API Endpoints**


| Endpoint | Method | Description |
|---------|--------|-------------|
| `/api/v1/health` | GET | Service health check |
| `/api/v1/documents/upload` | POST | Upload documents |
| `/api/v1/hackrx/run` | POST | RAG Q&A |
| `/api/v1/query/global` | POST | Cross-document search |
| `/api/v1/documents` | GET | List all documents |
| `/api/v1/documents/{id}` | DELETE | Delete document |
| `/api/v1/cache/stats` | GET | Cache metrics |
| `/api/v1/cache/refresh` | POST | Reload cache |
| `/api/v1/cache/clear` | POST | Clear cache |

## **🧪 Example Usage**

### **1️⃣ Upload a Document**
````

`import requests

API_URL = "http://localhost:8000" TOKEN = "your_valid_token" headers = {"Authorization": f"Bearer {TOKEN}"} with  open("insurance_policy.pdf", "rb") as f:
    response = requests.post( f"{API_URL}/api/v1/documents/upload",
        headers=headers,
        files={"file": f}
    )

doc_id = response.json()["document_id"] print(f"✅ Document uploaded successfully! ID: {doc_id}")` 
````

----------

### **2️⃣ Ask Questions (RAG-Powered)**
````

`questions = ["What is the coverage amount?", "Who is the policyholder?"]

response = requests.post( f"{API_URL}/api/v1/hackrx/run",
    headers=headers,
    json={ "document_id": doc_id, "questions": questions
    }
) for ans in response.json()["answers"]: print(f"💡 Question: {ans['question']}") print(f"📝 Answer: {ans['answer']}") print(f"📊 Confidence: {ans['confidence']}") print(f"📚 Sources: {ans['sources']}") print("-" * 40)` 
````

----------

### **3️⃣ Global Search Across Documents**
````

`query = "Claim process" response = requests.post( f"{API_URL}/api/v1/query/global",
    headers=headers,
    json={"query": query, "top_k": 5, "max_docs": 3}
) print("🔍 Top results:") for idx, item in  enumerate(response.json()["results"], 1): print(f"{idx}. Document: {item['document_id']}, Snippet: {item['snippet']}")` 
````

----------

## **⚡ Frontend Installation**

### **Prerequisites**

-   Node.js v18.x+
    
-   npm
    

### **Steps**
````

`cd ../frontend
npm install
npm run dev` 

Open [http://localhost:8080](http://localhost:8080) in your browser.
````

----------

## **📊 Frontend Structure**

-   `components/layout/` – Page structure
    
-   `components/ui/` – Reusable UI components
    
-   `hooks/` – Custom React hooks
    
-   `lib/` – Utility functions
    
-   `pages/` – Pages for routing
    
-   `services/` – API interaction
    

----------

## **💡 Tips**

-   Always upload a sample document before asking questions
    
-   Check confidence scores and sources for each answer
    
-   Use global search to find info across multiple documents
    

----------

## **🤝 Contributing**

1.  Fork the repository
    
2.  Create a feature branch
    
3.  Commit your changes
    
4.  Push to the branch
    
5.  Create a Pull Request
    

----------

## **🆘 Support**

-   Create an issue in the repo
    
-   Check existing documentation
    
-   Review API endpoint examples
    

----------

## **🔄 Version History**

-   **v3.0.0**: Current version with in-memory caching & Azure OpenAI
    
-   **v2.x**: Supabase storage integration
    
-   **v1.x**: Initial RAG implementation
    

----------

Built using **FastAPI, React, Azure OpenAI, FAISS, Supabase, Tailwind CSS, and shadcn-ui**
