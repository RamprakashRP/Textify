import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { askQuestion, globalSearch, FileItem } from "@/services/api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

interface ChatPanelProps {
  documents: FileItem[];
  selectedFileIds: string[];
  onGlobalSearchComplete: (sources: Source[]) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

interface Source {
  chunk_preview: string;
  file_name: string;
}



export const ChatPanel = ({ documents, selectedFileIds, onGlobalSearchComplete, messages, setMessages }: ChatPanelProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);

  useEffect(() => {
    const messagesArea = messagesAreaRef.current;
    if (!messagesArea) return;

    const isAtBottom = messagesArea.scrollHeight - messagesArea.scrollTop - messagesArea.clientHeight < 100;
    const isNewMessageFromAI = messages.length > 0 && messages[messages.length - 1].type === 'ai';

    if (isNewMessageFromAI) {
      if (isAtBottom) {
        // If user is near the bottom, scroll to the bottom
        messagesArea.scrollTo({ top: messagesArea.scrollHeight, behavior: 'smooth' });
      } else {
        // If user is scrolled up, find the last user message and scroll to it
        const userMessages = messagesArea.querySelectorAll('[data-message-type="user"]');
        const lastUserMessage = userMessages[userMessages.length - 1];
        if (lastUserMessage) {
          lastUserMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // If it's a user message, always scroll to the bottom
      messagesArea.scrollTo({ top: messagesArea.scrollHeight, behavior: 'smooth' });
    }

    prevScrollHeightRef.current = messagesArea.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let content = "Sorry, I couldn't find an answer.";
      let citations: ChatMessage['citations'] = [];
      let confidence: ChatMessage['confidence'] = 'high';

      const isGlobalSearch = selectedFileIds.length === 0 || selectedFileIds.length === documents.length;

      if (isGlobalSearch) {
        const apiResponse = await globalSearch(inputValue);
        if (apiResponse && apiResponse.answer) {
          content = apiResponse.answer;
          if (apiResponse.sources) {
            citations = apiResponse.sources.map(source => ({
              text: source.chunk_preview,
              source: source.file_name,
            }));
            onGlobalSearchComplete(apiResponse.sources);
          } else {
            onGlobalSearchComplete([]);
          }
        } else {
          onGlobalSearchComplete([]);
        }
      } else {
        const apiResponse = await askQuestion(selectedFileIds[0], [inputValue]);
        onGlobalSearchComplete([]);
        if (apiResponse && apiResponse.answers && apiResponse.answers.length > 0) {
          content = apiResponse.answers[0].answer;
          confidence = apiResponse.answers[0].confidence >= 0.7 ? 'high' : apiResponse.answers[0].confidence >= 0.4 ? 'medium' : 'low';
          citations = apiResponse.answers[0].sources.map(source => ({
            text: source.chunk_preview,
            source: source.document_id,
          }));
        }
      }

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        type: 'ai',
        content,
        citations,
        confidence,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        type: 'ai',
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-confidence-high text-white';
      case 'medium': return 'bg-confidence-medium text-white';
      case 'low': return 'bg-confidence-low text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Chat with Textify</h2>
            <p className="text-sm text-muted-foreground">
              {selectedFileIds.length > 0
                ? `Ask questions about your ${selectedFileIds.length} selected document${selectedFileIds.length > 1 ? 's' : ''}`
                : "Ask a question to all documents"
              }
            </p>
          </div>
          <Bot className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-glow animate-pulse">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ready to analyze your documents with Textify
            </h3>
            <p className="text-muted-foreground max-w-md">
              Upload PDFs, Word documents, or emails, then ask me anything about their content. 
              I'll provide detailed answers with citations and confidence scores.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                data-message-type={message.type}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-4 transition-smooth",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground ml-12 shadow-soft"
                      : "bg-card border border-border/50 shadow-soft"
                  )}
                >
                  <div className={cn("prose", message.type === 'user' ? "text-white" : "")}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  
                  {message.citations && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Sources:</p>
                      {message.citations.map((citation, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-citation/10 rounded-lg border border-citation/20"
                        >
                          <ExternalLink className="w-3 h-3 text-citation" />
                          <span className="text-xs text-citation-foreground font-medium">
                            {citation.text}
                          </span>
                          {citation.page && (
                            <span className="text-xs text-muted-foreground">
                              (Page {citation.page})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.confidence && (
                    <div className="mt-3 flex items-center gap-2">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <Badge className={cn("text-xs", getConfidenceColor(message.confidence))}>
                        {message.confidence.charAt(0).toUpperCase() + message.confidence.slice(1)} Confidence
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="text-xs text-white">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-soft">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-card/50">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Textify anything about your documents..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-12 bg-background border-border/50 focus:border-primary/50 transition-smooth"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="h-12 px-6 gradient-primary text-white shadow-medium hover:shadow-glow transition-bounce disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};