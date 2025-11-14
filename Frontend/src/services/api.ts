const API_BASE_URL = 'http://localhost:8000';
const API_TOKEN = '5b6105937b7cc769e46557d6241353e800d99cb57def59fd962d1d6ea8fcf736';

export interface FileItem {
  document_id: string;
  file_name: string;
  chunks_count: number;
  created_at: number;
  status: string;
  total_characters: number;
  embedding_model: string;
  supabase_path: string;
}

export interface GlobalSearchSource {
  document_id: string;
  file_name: string;
  chunk_preview: string;
  similarity_score: number;
}

export interface GlobalSearchResponse {
  answer: string;
  sources: GlobalSearchSource[];
  query: string;
  search_type: string;
  chunks_searched: number;
  documents_searched: number;
  model_used: string;
  filter_applied: boolean;
}

export interface AskQuestionSource {
  document_id: string;
  chunk_id: number;
  similarity_score: number;
  chunk_preview: string;
  rank: number;
}

export interface AskQuestionAnswer {
  question: string;
  answer: string;
  confidence: number;
  sources: AskQuestionSource[];
  chunks_retrieved: number;
  model_used: string;
  retrieval_info: {
    top_similarity_score: number;
    avg_similarity_score: number;
  };
}

export interface AskQuestionResponse {
  answers: AskQuestionAnswer[];
  document_id: string;
  total_questions: number;
  search_type: string;
  cache_hit: boolean;
  processing_info: {
    llm_service: string;
    model_used: string;
    total_chunks_searched: number;
    avg_confidence: number;
  };
}

export const getDocuments = async (): Promise<FileItem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/documents`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  const data = await response.json();
  return data.documents;
};

export interface DocumentUploadResponse {
  document_id: string;
  filename: string;
  status: string;
  chunks_created: number;
  message: string;
  supabase_path: string;
  public_url?: string;
}

export const uploadDocument = async (file: File): Promise<DocumentUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/v1/documents/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  return response.json();
};

export const askQuestion = async (document_id: string, questions: string[]): Promise<AskQuestionResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hackrx/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({ document_id, questions })
  });

  if (!response.ok) {
    throw new Error('Failed to ask question');
  }

  return response.json();
};

export const globalSearch = async (query: string): Promise<GlobalSearchResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/query/global`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({ query, top_k: 10, max_docs: 5 })
  });

  if (!response.ok) {
    throw new Error('Failed to perform global search');
  }

  return response.json();
};
