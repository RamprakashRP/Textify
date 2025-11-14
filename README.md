**📄 Textify — AI-Powered Insurance Document Q&A System
**
Textify is an intelligent RAG-powered platform for insurance documents.
Upload PDFs, Word files, and emails, and get instant, citation-backed answers with confidence scores.
Built with a modular architecture combining FastAPI, Azure OpenAI, FAISS, Supabase, and a polished React + TypeScript frontend.


**✨ Overview
**
Insurance companies handle massive volumes of unstructured documents. Textify enables users to:
Upload multiple insurance PDFs, DOCX, and emails
Ask questions and get accurate AI-generated answers
Retrieve context with citations for compliance and auditing


**Key Benefits:
**
⚡ Fast, real-time answers
🔍 Semantic search across multiple documents
🛡️ Secure storage and access control


**🏗️ System Architecture
**
Frontend (React + TypeScript)
        ↓
Backend API (FastAPI)
        ↓
Text Extraction → Chunking → Embeddings
        ↓                   ↓
 Supabase Storage     FAISS Vector Store
        ↓                   ↓
          Azure OpenAI (LLM Answering)


**🚀 Features
**
📂 Document Processing

PDF / DOCX / Email formats supported
Smart semantic chunking
Batch embeddings for speed

🔎 Retrieval-Augmented QA

FAISS similarity search
Multi-question processing
Citation-backed answers

⚡ Performance

In-memory vector cache for repeated queries
Startup preloading for instant responses

🔐 Security

Bearer-token API authentication
CORS protection

Supabase storage with role-level access

🖥️ Frontend

Drag-and-drop document upload
Real-time streaming of answers
Responsive and clean UI with shadcn components


**🧰 Tech Stack
**
Backend:

FastAPI
Python 3.9+
FAISS vector search
Azure OpenAI
Supabase storage

Frontend:

React + TypeScript
Vite
Tailwind CSS
shadcn UI
React Query


**🔧 Installation & Setup
**
Backend

Clone the repo:

git clone https://github.com/your_username/Textify.git
cd backend


Install dependencies:

pip install -r requirements.txt


Create .env file:

VALID_TOKEN=your_secure_token_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_BUCKET=documents
ENVIRONMENT=production
DEBUG=false


Run locally:

uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Frontend

Navigate to frontend:

cd frontend


Install npm packages:

npm install

**📚 API Endpoints
**
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

**📁 Folder Structure
**
Frontend
frontend/
 ├── public/
 ├── src/
 │   ├── components/
 │   │   ├── layout/
 │   │   └── ui/
 │   ├── hooks/
 │   ├── lib/
 │   ├── pages/
 │   └── services/
 ├── .gitignore
 ├── index.html
 ├── package.json
 └── vite.config.ts

Backend
backend/
 ├── main.py
 ├── services/
 ├── processors/
 ├── utils/
 ├── cache/
 ├── requirements.txt
 ├── .env.example

**🧪 Example Usage
**
1️⃣ Upload a Document

Upload your insurance PDF, Word file, or email for processing:

import requests

API_URL = "http://localhost:8000"
TOKEN = "your_valid_token"
headers = {"Authorization": f"Bearer {TOKEN}"}

# Upload document
with open("insurance_policy.pdf", "rb") as f:
    response = requests.post(
        f"{API_URL}/api/v1/documents/upload",
        headers=headers,
        files={"file": f}
    )

# Get the document ID for future queries
doc_id = response.json()["document_id"]
print(f"✅ Document uploaded successfully! ID: {doc_id}")

2️⃣ Ask Questions (RAG-Powered)

Query your document with specific questions:

# Example question to the uploaded document
questions = ["What is the coverage amount?", "Who is the policyholder?"]

response = requests.post(
    f"{API_URL}/api/v1/hackrx/run",
    headers=headers,
    json={
        "document_id": doc_id,
        "questions": questions
    }
)

# Print answers with confidence and sources
for ans in response.json()["answers"]:
    print(f"💡 Question: {ans['question']}")
    print(f"📝 Answer: {ans['answer']}")
    print(f"📊 Confidence: {ans['confidence']}")
    print(f"📚 Sources: {ans['sources']}")
    print("-" * 40)

3️⃣ Global Search Across Documents

Search across all uploaded documents for a keyword or topic:

query = "Claim process"

response = requests.post(
    f"{API_URL}/api/v1/query/global",
    headers=headers,
    json={
        "query": query,
        "top_k": 5,
        "max_docs": 3
    }
)

print("🔍 Top results:")
for idx, item in enumerate(response.json()["results"], 1):
    print(f"{idx}. Document: {item['document_id']}, Snippet: {item['snippet']}")

Run development server:

npm run dev
