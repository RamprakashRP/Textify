import { useState } from "react";
import { Lightbulb, Network, FileText, TrendingUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InsightsPanelProps {
  selectedFileIds: string[];
  globalSearchSources: Source[];
}

interface Source {
  file_name: string;
  chunk_preview: string;
  similarity_score: number;
}

export const InsightsPanel = ({ selectedFileIds, globalSearchSources }: InsightsPanelProps) => {
  const [activeTab, setActiveTab] = useState("highlights");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Insights
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedFileIds.length > 0 
            ? `Analysis from ${selectedFileIds.length} selected document${selectedFileIds.length > 1 ? 's' : ''}`
            : "AI-generated analysis and key findings"
          }
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedFileIds.length === 0 && globalSearchSources.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-accent-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">No documents selected or global search performed</p>
            <p className="text-xs text-muted-foreground/70">
              Select documents from the Sources panel to see insights and analysis, or perform a global search
            </p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="highlights" className="text-xs">Highlights</TabsTrigger>
              <TabsTrigger value="global-sources" className="text-xs">Global Sources</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden p-4">
              <TabsContent value="highlights" className="h-full overflow-y-auto space-y-4 mt-0">
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <p className="text-sm text-muted-foreground mb-2">Highlights feature is currently unavailable.</p>
                  <p className="text-xs text-muted-foreground/70">
                    Please select a document and ask a question in the chat to get insights.
                  </p>
                </div>
              </TabsContent>

              

              

              <TabsContent value="global-sources" className="h-full overflow-y-auto space-y-4 mt-0">
                {globalSearchSources.length > 0 ? (
                  globalSearchSources.map((source, index) => (
                    <Card key={index} className="border-border/50 shadow-soft hover:shadow-medium transition-smooth">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-foreground">
                          {source.file_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {source.chunk_preview}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Similarity: {(source.similarity_score * 100).toFixed(2)}%</span>
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            View Document
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <p className="text-sm text-muted-foreground mb-2">Perform a global search to see sources</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};