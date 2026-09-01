import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Sparkles,
  X
} from "lucide-react";

interface PricingPlansProps {
  onSelectPlan: (plan: string) => void;
  onBack?: () => void;
}

export function PricingPlans({ onSelectPlan, onBack }: PricingPlansProps) {
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      icon: Star,
      color: "from-gray-600 to-gray-700",
      popular: false,
      features: [
        "3 apps per month",
        "Basic AI templates",
        "Community support",
        "Web deployment",
        "Basic analytics"
      ],
      limitations: [
        "No custom branding",
        "Limited AI features",
        "No app store publishing",
        "No priority support"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      description: "Great for serious creators",
      price: "$29",
      period: "per month",
      icon: Zap,
      color: "from-blue-600 to-blue-700",
      popular: true,
      features: [
        "20 apps per month",
        "Advanced AI templates",
        "Priority support",
        "App store publishing",
        "Advanced analytics",
        "Custom branding",
        "API integrations",
        "Team collaboration (up to 5)"
      ],
      limitations: [
        "No white-label options",
        "Standard AI processing speed"
      ]
    },
    {
      id: "plus",
      name: "Plus",
      description: "The ultimate app building experience",
      price: "$99",
      period: "per month",
      icon: Crown,
      color: "from-purple-600 to-purple-700",
      popular: false,
      features: [
        "Unlimited apps",
        "Premium AI models",
        "24/7 dedicated support",
        "White-label solutions",
        "Enterprise integrations",
        "Advanced team features",
        "Custom AI training",
        "Priority processing",
        "Advanced security",
        "Custom onboarding"
      ],
      limitations: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Choose Your Plan
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Find the Perfect Plan for Your Needs
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start building amazing apps with our AI-powered platform. 
              Upgrade or downgrade anytime as your needs change.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.id}
                  className={`relative border-2 transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'border-blue-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-6 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-3 text-green-700">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 text-red-700">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                          : plan.id === 'plus'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                      }`}
                      onClick={() => onSelectPlan(plan.id)}
                    >
                      {plan.price === "$0" ? "Start Free" : `Choose ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-2">Can I change plans anytime?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
                
                <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                <p className="text-sm text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
                
                <h4 className="font-medium mb-2">Is there a free trial?</h4>
                <p className="text-sm text-gray-600">
                  Yes! Start with our free plan and try all premium features for 14 days when you upgrade.
                </p>
              </div>
            </div>
          </div>

          {/* Back button if provided */}
          {onBack && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={onBack}>
                Back to Setup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}