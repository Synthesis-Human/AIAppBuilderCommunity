import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Smartphone, 
  Download, 
  Star, 
  ExternalLink, 
  ArrowLeft,
  Globe,
  Play,
  Apple
} from 'lucide-react';

interface AppStoreRedirectProps {
  onBack: () => void;
}

export function AppStoreRedirect({ onBack }: AppStoreRedirectProps) {
  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    // Auto-redirect after 3 seconds if on mobile
    const timer = setTimeout(() => {
      if (isIOS) {
        window.location.href = 'https://apps.apple.com/search?term=appcraft%20ai';
      } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/search?q=appcraft%20ai&c=apps';
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDirectDownload = (platform: 'ios' | 'android' | 'web') => {
    switch (platform) {
      case 'ios':
        window.open('https://apps.apple.com/search?term=appcraft%20ai', '_blank');
        break;
      case 'android':
        window.open('https://play.google.com/store/search?q=appcraft%20ai&c=apps', '_blank');
        break;
      case 'web':
        // Install as PWA
        window.location.href = '/';
        break;
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
                <Download className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Get AppCraft AI</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Smartphone className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AppCraft AI
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Transform your ideas into stunning apps using AI
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">4.9/5 • 10k+ users</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* iOS App Store */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" 
                onClick={() => handleDirectDownload('ios')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                Download for iOS
                <Badge variant="outline">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                iPhone, iPad, and Apple Silicon Macs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                <Apple className="w-4 h-4 mr-2" />
                App Store
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Optimized for iOS 15.0 and later
              </p>
            </CardContent>
          </Card>

          {/* Google Play Store */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" 
                onClick={() => handleDirectDownload('android')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                Download for Android
                <Badge variant="outline">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                Android phones, tablets, and Chromebooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Google Play
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Requires Android 7.0 (API level 24)
              </p>
            </CardContent>
          </Card>

          {/* Web App / PWA */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50" 
                onClick={() => handleDirectDownload('web')}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                Install Web App
                <Badge className="bg-green-100 text-green-800">Available Now</Badge>
              </CardTitle>
              <CardDescription>
                Works on all devices • No app store needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Install Now
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Instant access • Works offline • Auto-updates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose AppCraft AI?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Installation</h3>
              <p className="text-sm text-gray-600">Install directly from your browser or app store. Works on all devices.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Works Everywhere</h3>
              <p className="text-sm text-gray-600">Seamless experience across desktop, tablet, and mobile devices.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Always Updated</h3>
              <p className="text-sm text-gray-600">Automatic updates ensure you always have the latest features.</p>
            </div>
          </div>
        </div>

        {/* Auto-redirect notice */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            🤖 Detecting your device... You'll be redirected to the appropriate store shortly
          </p>
        </div>
      </div>
    </div>
  );
}