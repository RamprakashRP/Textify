import { useState, useEffect } from "react";
import { SourcesPanel } from "./SourcesPanel";
import { ChatPanel } from "./ChatPanel";
import { InsightsPanel } from "./InsightsPanel";
import { Header } from "./Header";
import { FileItem, getDocuments } from "@/services/api";

interface Source {
  file_name: string;
  chunk_preview: string;
  similarity_score: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  citations?: Array<{
    text: string;
    source: string;
    page?: number;
  }>;
  confidence?: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export const MainLayout = () => {
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [documents, setDocuments] = useState<FileItem[]>([]);
  const [globalSearchSources, setGlobalSearchSources] = useState<Source[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setGlobalSearchSources([]); // Clear global search sources as well for a new chat
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNewChat={handleNewChat} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sources Panel - Left Sidebar */}
        <div className="w-80 border-r border-border bg-card/50 backdrop-blur-sm">
          <SourcesPanel 
            files={documents}
            selectedFileIds={selectedFileIds}
            onFileSelectionChange={setSelectedFileIds}
            onFilesUpload={setDocuments}
          />
        </div>

        {/* Chat Panel - Center */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatPanel 
            documents={documents}
            selectedFileIds={selectedFileIds}
            onGlobalSearchComplete={setGlobalSearchSources}
            messages={messages}
            setMessages={setMessages}
          />
        </div>

        {/* Insights Panel - Right Sidebar */}
        <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm">
          <InsightsPanel 
            selectedFileIds={selectedFileIds}
            globalSearchSources={globalSearchSources}
          />
        </div>
      </div>
    </div>
  );
};