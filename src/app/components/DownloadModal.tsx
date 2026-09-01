import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Smartphone, ExternalLink, Download, Globe, QrCode, Share2, Monitor } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [showQR, setShowQR] = useState(false);

  const storeLinks = [
    {
      name: "Android",
      description: "Get it on Google Play",
      icon: "🤖",
      storeUrl: "https://play.google.com/store/search?q=appcraft%20ai&c=apps",
      color: "from-green-600 to-green-700",
      available: false
    },
    {
      name: "iPhone/iPad", 
      description: "Download on the App Store",
      icon: "🍎",
      storeUrl: "https://apps.apple.com/search?term=appcraft%20ai",
      color: "from-gray-800 to-black",
      available: false
    },
    {
      name: "Google Pixel",
      description: "Optimized for Pixel devices",
      icon: "📱",
      storeUrl: "https://play.google.com/store/search?q=appcraft%20ai&c=apps",
      color: "from-blue-600 to-blue-700",
      badge: "Optimized",
      available: false
    }
  ];

  const handleStoreDownload = (device: typeof storeLinks[0]) => {
    if (device.available) {
      window.open(device.storeUrl, '_blank');
    } else {
      // Redirect to web version for now
      window.open(window.location.href, '_blank');
    }
    onClose();
  };

  const handleInstallPWA = () => {
    // This will be handled by the PWAInstallPrompt component
    onClose();
    
    // Trigger PWA install if available
    const event = new CustomEvent('pwa-install-request');
    window.dispatchEvent(event);
  };

  const handleWebApp = () => {
    // Open in new tab optimized for mobile
    const webAppUrl = window.location.href;
    window.open(webAppUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Get AppCraft AI
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to access AppCraft AI on your device
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="install" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="install">Install App</TabsTrigger>
            <TabsTrigger value="stores">App Stores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="install" className="space-y-4">
            {/* PWA Install Option */}
            <div className="space-y-3">
              <Button
                onClick={handleInstallPWA}
                className="w-full h-auto p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">Install as App</div>
                    <p className="text-sm text-white/80">
                      Add to home screen • Works offline • Native feel
                    </p>
                  </div>
                </div>
              </Button>

              <Button
                onClick={handleWebApp}
                variant="outline"
                className="w-full h-auto p-4"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">Use Web App</div>
                    <p className="text-sm text-gray-600">
                      No installation required • Instant access
                    </p>
                  </div>
                </div>
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Monitor className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Why install?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Faster loading and better performance</li>
                    <li>• Works offline for your saved projects</li>
                    <li>• Native app experience on your device</li>
                    <li>• Quick access from your home screen</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stores" className="space-y-4">
            <div className="space-y-3">
              {storeLinks.map((store) => (
                <Button
                  key={store.name}
                  variant="outline"
                  className={`w-full h-auto p-4 flex items-center justify-between hover:bg-gradient-to-r hover:${store.color} hover:text-white group transition-all ${!store.available ? 'opacity-60' : ''}`}
                  onClick={() => handleStoreDownload(store)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{store.icon}</span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{store.name}</span>
                        {store.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {store.badge}
                          </Badge>
                        )}
                        {!store.available && (
                          <Badge variant="outline" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 group-hover:text-white/80">
                        {store.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </Button>
              ))}
            </div>

            <Separator />

            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                Native apps coming to app stores soon!
              </p>
              <p className="text-xs text-gray-400">
                For now, enjoy the full experience as a web app
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}