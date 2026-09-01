import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sparkles, 
  Wand2, 
  Eye, 
  Code2, 
  Smartphone, 
  ArrowLeft,
  Play,
  RefreshCw,
  Download,
  Share2,
  ExternalLink
} from "lucide-react";

interface AIAppBuilderProps {
  onBack: () => void;
}

export function AIAppBuilder({ onBack }: AIAppBuilderProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedApp, setGeneratedApp] = useState<any>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  const samplePrompts = [
    "Create a todo list app with dark mode and categories",
    "Build a weather app with 7-day forecast and location search",
    "Make a recipe sharing app with photo upload and ratings",
    "Design a fitness tracker with workout logging and progress charts",
    "Create a social media app for sharing daily moments"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockApp = {
        name: generateAppName(prompt),
        description: `AI-generated app based on: "${prompt}"`,
        features: generateFeatures(prompt),
        preview: generatePreview(prompt),
        code: generateMockCode(prompt),
        icon: generateAppIcon(prompt)
      };
      setGeneratedApp(mockApp);
      setIsGenerating(false);
    }, 3000);
  };

  const generateAppName = (prompt: string) => {
    const keywords = prompt.toLowerCase();
    if (keywords.includes('todo') || keywords.includes('task')) return 'TaskFlow Pro';
    if (keywords.includes('weather')) return 'SkyWatch';
    if (keywords.includes('recipe') || keywords.includes('food')) return 'ChefShare';
    if (keywords.includes('fitness') || keywords.includes('workout')) return 'FitTracker';
    if (keywords.includes('social') || keywords.includes('photo')) return 'MomentShare';
    return 'MyAwesome App';
  };

  const generateAppIcon = (prompt: string) => {
    const keywords = prompt.toLowerCase();
    if (keywords.includes('todo') || keywords.includes('task')) {
      return {
        emoji: '✅',
        color: '#10b981',
        bg: '#d1fae5'
      };
    }
    if (keywords.includes('weather')) {
      return {
        emoji: '☀️',
        color: '#f59e0b',
        bg: '#fef3c7'
      };
    }
    if (keywords.includes('recipe') || keywords.includes('food')) {
      return {
        emoji: '👨‍🍳',
        color: '#ef4444',
        bg: '#fee2e2'
      };
    }
    if (keywords.includes('fitness') || keywords.includes('workout')) {
      return {
        emoji: '💪',
        color: '#8b5cf6',
        bg: '#ede9fe'
      };
    }
    if (keywords.includes('social') || keywords.includes('photo')) {
      return {
        emoji: '📸',
        color: '#06b6d4',
        bg: '#cffafe'
      };
    }
    return {
      emoji: '🚀',
      color: '#6366f1',
      bg: '#e0e7ff'
    };
  };

  const generateFeatures = (prompt: string) => {
    const baseFeatures = ['User Authentication', 'Responsive Design', 'Cloud Sync'];
    const keywords = prompt.toLowerCase();
    
    if (keywords.includes('todo') || keywords.includes('task')) {
      return [...baseFeatures, 'Task Management', 'Categories', 'Due Dates', 'Notifications'];
    }
    if (keywords.includes('weather')) {
      return [...baseFeatures, 'Weather Forecast', 'Location Services', 'Weather Alerts'];
    }
    if (keywords.includes('recipe')) {
      return [...baseFeatures, 'Recipe Storage', 'Photo Upload', 'Rating System', 'Search'];
    }
    if (keywords.includes('fitness')) {
      return [...baseFeatures, 'Workout Logging', 'Progress Tracking', 'Charts & Analytics'];
    }
    return [...baseFeatures, 'Custom Features', 'Modern UI', 'Fast Performance'];
  };

  const generatePreview = (prompt: string) => {
    const keywords = prompt.toLowerCase();
    if (keywords.includes('todo') || keywords.includes('task')) {
      return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=600&fit=crop';
    }
    if (keywords.includes('weather')) {
      return 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=300&h=600&fit=crop';
    }
    if (keywords.includes('recipe')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=600&fit=crop';
    }
    if (keywords.includes('fitness')) {
      return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=600&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop';
  };

  const generateMockCode = (prompt: string) => {
    return `import React from 'react';
import { Card, Button } from './ui/components';

export default function ${generateAppName(prompt).replace(/\s+/g, '')}() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">${generateAppName(prompt)}</h1>
      </header>
      
      <main className="container mx-auto p-4">
        {/* AI-generated content based on: ${prompt} */}
        <Card className="p-6">
          <h2>Welcome to your AI-generated app!</h2>
          <p>This app was created based on your description.</p>
        </Card>
      </main>
    </div>
  );
}`;
  };

  const handleOpenPreview = () => {
    if (!generatedApp) return;
    
    setShowPreviewDialog(false);
    
    // Create a favicon data URL using the app's icon
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw background
      ctx.fillStyle = generatedApp.icon.bg;
      ctx.fillRect(0, 0, 32, 32);
      
      // Draw emoji icon
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(generatedApp.icon.emoji, 16, 16);
    }
    const faviconDataUrl = canvas.toDataURL();
    
    // Create a new window with the app preview
    const previewWindow = window.open('', '_blank', 'width=375,height=667,scrollbars=yes');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${generatedApp.name} - Live Preview</title>
          <link rel="icon" type="image/png" href="${faviconDataUrl}">
          <style>
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(to bottom, ${generatedApp.icon.bg}, #ffffff);
              min-height: 100vh;
            }
            .header { 
              padding: 16px; 
              background: white; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              border-bottom: 1px solid #e5e7eb;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .app-icon {
              width: 40px;
              height: 40px;
              background: ${generatedApp.icon.bg};
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              border: 2px solid ${generatedApp.icon.color};
            }
            .header h1 { 
              margin: 0; 
              font-size: 24px; 
              font-weight: bold;
              color: #1f2937;
            }
            .main { 
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .card { 
              background: white; 
              padding: 24px; 
              border-radius: 12px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.05);
              margin-bottom: 16px;
              border-left: 4px solid ${generatedApp.icon.color};
            }
            .feature-list {
              list-style: none;
              padding: 0;
              margin: 16px 0;
            }
            .feature-list li {
              padding: 8px 0;
              border-bottom: 1px solid #f3f4f6;
              color: #374151;
            }
            .feature-list li:last-child {
              border-bottom: none;
            }
            .badge {
              background: ${generatedApp.icon.bg};
              color: ${generatedApp.icon.color};
              padding: 4px 8px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 500;
              display: inline-block;
              margin-bottom: 12px;
              border: 1px solid ${generatedApp.icon.color};
            }
            .live-indicator {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #10b981;
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 500;
              display: flex;
              align-items: center;
              gap: 6px;
              z-index: 1000;
            }
            .pulse {
              width: 8px;
              height: 8px;
              background: #34d399;
              border-radius: 50%;
              animation: pulse 2s infinite;
            }
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          </style>
        </head>
        <body>
          <div class="live-indicator">
            <div class="pulse"></div>
            LIVE
          </div>
          
          <div class="header">
            <div class="app-icon">${generatedApp.icon.emoji}</div>
            <h1>${generatedApp.name}</h1>
          </div>
          
          <div class="main">
            <div class="card">
              <div class="badge">🤖 AI Generated • Live Preview</div>
              <h2>Welcome to ${generatedApp.name}!</h2>
              <p>${generatedApp.description}</p>
              
              <h3>✨ App Features:</h3>
              <ul class="feature-list">
                ${generatedApp.features.map((feature: string) => `<li>✅ ${feature}</li>`).join('')}
              </ul>
            </div>
            
            <div class="card">
              <h3>🎉 Your app is live and ready!</h3>
              <p>This is a real-time preview of your AI-generated application. You can now deploy it to production, publish it to app stores, or continue building with additional features.</p>
            </div>
            
            <div class="card">
              <h3>🚀 Next Steps</h3>
              <ul class="feature-list">
                <li>🌐 Deploy to web hosting</li>
                <li>📱 Package for mobile app stores</li>
                <li>🔧 Add custom functionality</li>
                <li>👥 Share with your team</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `);
      previewWindow.document.close();
      
      // Focus the new window
      previewWindow.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI App Builder</h1>
                <p className="text-sm text-gray-600">Describe your app and watch AI build it</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Describe Your App
                </CardTitle>
                <CardDescription>
                  Tell our AI what kind of app you want to build. Be as detailed as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: Create a todo list app with dark mode, categories, due dates, and the ability to share tasks with teammates..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                
                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating App...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate App
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Sample Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Need inspiration?</CardTitle>
                <CardDescription>Try one of these sample prompts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {samplePrompts.map((samplePrompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left h-auto p-3 text-wrap"
                      onClick={() => setPrompt(samplePrompt)}
                    >
                      {samplePrompt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {isGenerating && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">AI is building your app...</h3>
                      <p className="text-sm text-gray-600">
                        Analyzing your requirements and generating the perfect app for you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedApp && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
                        style={{ 
                          backgroundColor: generatedApp.icon.bg,
                          borderColor: generatedApp.icon.color
                        }}
                      >
                        <span className="text-lg">
                          {generatedApp.icon.emoji}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {generatedApp.name}
                        </CardTitle>
                        <CardDescription>{generatedApp.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Generated
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <ImageWithFallback 
                          src={generatedApp.preview}
                          alt={`${generatedApp.name} Preview`}
                          className="w-32 h-56 object-cover rounded-lg mx-auto shadow-lg"
                        />
                        <p className="text-sm text-gray-600 mt-2">App Preview</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                          <DialogTrigger asChild>
                            <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                              <Play className="w-4 h-4 mr-2" />
                              View Live
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: generatedApp.icon.bg }}
                                >
                                  <span style={{ color: generatedApp.icon.color }}>
                                    {generatedApp.icon.emoji}
                                  </span>
                                </div>
                                {generatedApp.name} - Live Preview
                              </DialogTitle>
                              <DialogDescription>
                                Would you like to view your app in real time? Click below to see it running in your browser with a custom icon and title.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-3 py-4">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium text-sm">Opens in new tab</p>
                                  <p className="text-xs text-gray-600">With custom app icon and title</p>
                                </div>
                              </div>
                              <Button 
                                onClick={handleOpenPreview}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Launch Live Preview
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features" className="space-y-4">
                      <div className="space-y-2">
                        {generatedApp.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <Code2 className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {!generatedApp && !isGenerating && (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated app will appear here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}