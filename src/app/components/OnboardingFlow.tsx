import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Smartphone, 
  Globe, 
  Palette, 
  Zap,
  Users,
  TrendingUp
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
  onShowPricing: () => void;
}

export function OnboardingFlow({ onComplete, onShowPricing }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAppType, setSelectedAppType] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const steps = [
    {
      title: "Welcome to AppCraft AI",
      description: "Let's get you started on your app building journey",
      content: "welcome"
    },
    {
      title: "Choose Your App Type",
      description: "What kind of app do you want to build?",
      content: "appType"
    },
    {
      title: "Select Features",
      description: "What features would you like to include?",
      content: "features"
    },
    {
      title: "Choose Your Plan",
      description: "Pick the perfect plan for your needs",
      content: "pricing"
    }
  ];

  const appTypes = [
    {
      id: "business",
      title: "Business App",
      description: "Tools, dashboards, and productivity apps",
      icon: TrendingUp,
      examples: "CRM, Project Management, Analytics"
    },
    {
      id: "social",
      title: "Social App",
      description: "Community and social networking apps",
      icon: Users,
      examples: "Chat, Forums, Social Media"
    },
    {
      id: "ecommerce",
      title: "E-commerce App",
      description: "Online stores and marketplace apps",
      icon: Smartphone,
      examples: "Shopping, Marketplace, Booking"
    },
    {
      id: "content",
      title: "Content App",
      description: "Media, news, and content sharing apps",
      icon: Globe,
      examples: "Blog, News, Portfolio"
    }
  ];

  const features = [
    { id: "auth", title: "User Authentication", description: "Login, signup, and user management" },
    { id: "payments", title: "Payment Integration", description: "Accept payments and subscriptions" },
    { id: "notifications", title: "Push Notifications", description: "Engage users with notifications" },
    { id: "analytics", title: "Analytics Dashboard", description: "Track user behavior and app performance" },
    { id: "chat", title: "Real-time Chat", description: "In-app messaging and communication" },
    { id: "maps", title: "Maps Integration", description: "Location services and mapping" }
  ];

  const nextStep = () => {
    if (currentStep === 2) {
      onShowPricing();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const renderStepContent = () => {
    switch (steps[currentStep].content) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Welcome to AppCraft AI! 🎉</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                You're about to embark on an amazing journey of creating apps powered by AI. 
                Let's walk through a quick setup to personalize your experience.
              </p>
            </div>
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1624298696100-a6aae4884881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTg0ODExNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="App Development"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        );

      case "appType":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What would you like to build?</h2>
              <p className="text-gray-600">Choose the type that best matches your app idea</p>
            </div>
            <div className="grid gap-4">
              {appTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                      selectedAppType === type.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAppType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedAppType === type.id 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{type.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                          <Badge variant="secondary" className="text-xs">
                            Examples: {type.examples}
                          </Badge>
                        </div>
                        {selectedAppType === type.id && (
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case "features":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Features</h2>
              <p className="text-gray-600">Select the features you'd like to include in your app</p>
            </div>
            <div className="grid gap-3">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                    selectedFeatures.includes(feature.id) 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      {selectedFeatures.includes(feature.id) && (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Content */}
          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="text-center">
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button 
              onClick={currentStep === 2 ? onShowPricing : nextStep}
              disabled={
                (currentStep === 1 && !selectedAppType) ||
                (currentStep === 2 && selectedFeatures.length === 0)
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              {currentStep === 2 ? "Choose Plan" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}