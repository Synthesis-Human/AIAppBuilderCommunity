import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';
import { 
  Plus, 
  Sparkles, 
  BarChart3, 
  Settings, 
  Crown, 
  Zap,
  Star,
  Smartphone,
  Globe,
  Users,
  TrendingUp,
  Eye,
  Download,
  Share2,
  Edit3,
  User,
  Phone,
  Mail,
  Shield,
  CheckCircle,
  CreditCard,
  Infinity
} from "lucide-react";

interface AppDashboardProps {
  selectedPlan: string;
  onShowPricing: () => void;
  onPlanChange?: (plan: string) => void;
}

export function AppDashboard({ selectedPlan, onShowPricing, onPlanChange }: AppDashboardProps) {
  const [activeTab, setActiveTab] = useState("apps");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  
  // User profile state
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    notifications: true,
    twoFactor: false
  });

  const handleProfileUpdate = (field: string, value: string | boolean) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanSwitch = (newPlan: string) => {
    if (newPlan === 'free') {
      // Free plan doesn't require payment
      if (onPlanChange) {
        onPlanChange(newPlan);
      }
    } else {
      // Paid plans require payment modal
      setPendingPlan(newPlan);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (planKey: string) => {
    if (onPlanChange) {
      onPlanChange(planKey);
    }
    setPendingPlan(null);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setPendingPlan(null);
  };

  const planDetails = {
    free: { 
      name: "Free", 
      icon: Star, 
      color: "text-gray-600", 
      appsLeft: 3,
      price: "$0",
      features: [
        "3 AI apps per month",
        "Basic templates", 
        "Community support",
        "Web deployment"
      ]
    },
    premium: { 
      name: "Premium", 
      icon: Zap, 
      color: "text-blue-600", 
      appsLeft: 17,
      price: "$100",
      features: [
        "20 AI apps per month",
        "Premium templates",
        "Priority support", 
        "Advanced analytics",
        "Custom domains",
        "Team collaboration"
      ]
    },
    plus: { 
      name: "Plus", 
      icon: Crown, 
      color: "text-purple-600", 
      appsLeft: "Unlimited",
      price: "$200",
      features: [
        "Unlimited AI apps",
        "All premium features",
        "White-label solutions",
        "API access",
        "Advanced integrations",
        "24/7 dedicated support",
        "Custom AI models"
      ]
    }
  };

  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.free;

  const sampleApps = [
    {
      id: 1,
      name: "TaskMaster Pro",
      type: "Business",
      status: "Published",
      views: "2.3k",
      downloads: "450",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      description: "A productivity app for managing tasks and projects"
    },
    {
      id: 2,
      name: "Social Connect",
      type: "Social",
      status: "Draft",
      views: "0",
      downloads: "0",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=200&fit=crop",
      description: "Connect with friends and share moments"
    },
    {
      id: 3,
      name: "ShopEasy",
      type: "E-commerce",
      status: "Review",
      views: "1.1k",
      downloads: "230",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      description: "Simple online shopping experience"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Business Dashboard",
      category: "Business",
      preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      premium: false
    },
    {
      id: 2,
      name: "Social Media App",
      category: "Social",
      preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
      premium: true
    },
    {
      id: 3,
      name: "E-commerce Store",
      category: "Shopping",
      preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      premium: true
    },
    {
      id: 4,
      name: "Portfolio Website",
      category: "Portfolio",
      preview: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop",
      premium: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AppCraft AI</span>
              </div>
              <Badge variant="outline" className={`${currentPlan.color} border-current`}>
                <currentPlan.icon className="w-3 h-3 mr-1" />
                {currentPlan.name} Plan
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onShowPricing}>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Apps This Month</p>
                  <p className="text-2xl font-bold">{selectedPlan === 'free' ? '0/3' : selectedPlan === 'premium' ? '3/20' : '12'}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">3.4k</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold">680</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="apps">My Apps</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="apps" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Apps</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New App
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback 
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        app.status === 'Published' ? 'bg-green-100 text-green-800' :
                        app.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{app.name}</h3>
                        <Badge variant="outline">{app.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{app.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {app.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {app.downloads}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">AI Templates</h2>
              <p className="text-gray-600">Choose from our curated collection of AI-powered templates</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback 
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    {template.premium && (
                      <Badge className="absolute top-2 right-2 bg-purple-100 text-purple-800">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      disabled={template.premium && selectedPlan === 'free'}
                    >
                      {template.premium && selectedPlan === 'free' ? 'Upgrade Required' : 'Use Template'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Performance</CardTitle>
                  <CardDescription>Views and downloads over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Analytics chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>How users interact with your apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Engagement metrics would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="project" className="space-y-6 mt-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Project Settings</h2>
              
              <div className="grid gap-6">
                {/* User Profile Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      User Profile
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information and account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={userProfile.firstName}
                          onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={userProfile.lastName}
                          onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                          placeholder="Enter your email address"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className="pl-10"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Used for account recovery and two-factor authentication
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">
                          Receive updates about your apps and account
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.notifications}
                        onCheckedChange={(checked) => handleProfileUpdate('notifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.twoFactor}
                        onCheckedChange={(checked) => handleProfileUpdate('twoFactor', checked)}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline">
                        Reset Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security & Recovery
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and recovery options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Phone Recovery</h4>
                          <p className="text-sm text-blue-700">
                            Your phone number {userProfile.phone} is verified and can be used for password recovery.
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            If your account gets compromised, we'll send a recovery code to this number.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <Shield className="w-4 h-4 mr-2" />
                        View Login History
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Update Recovery Phone
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6 mt-6">
            <div className="max-w-6xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">
                  Scale your AI app development with the perfect plan for your needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(planDetails).map(([planKey, plan]) => (
                  <Card 
                    key={planKey}
                    className={`relative ${
                      selectedPlan === planKey 
                        ? 'ring-2 ring-purple-500 shadow-lg' 
                        : 'hover:shadow-lg'
                    } transition-all`}
                  >
                    {selectedPlan === planKey && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600 text-white px-3 py-1">
                          Current Plan
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 ${
                        planKey === 'free' ? 'bg-gray-100' :
                        planKey === 'premium' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <plan.icon className={`w-6 h-6 ${plan.color}`} />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold mt-2">
                        {plan.price}
                        {planKey !== 'free' && <span className="text-lg text-gray-600">/month</span>}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {selectedPlan === planKey ? (
                        <div className="space-y-2">
                          <Button disabled className="w-full">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Current Plan
                          </Button>
                          {planKey !== 'free' && (
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handlePlanSwitch('free')}
                            >
                              Switch to Free
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button 
                          className={`w-full ${
                            planKey === 'premium' 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : planKey === 'plus'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : ''
                          }`}
                          onClick={() => handlePlanSwitch(planKey)}
                        >
                          {planKey === 'free' ? 'Switch to Free' : 
                           planKey === 'premium' ? 'Choose Premium' : 'Choose Plus'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Plan Comparison */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Plan Comparison</CardTitle>
                  <CardDescription>
                    See what's included with each plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Feature</th>
                          <th className="text-center py-3 px-4">Free</th>
                          <th className="text-center py-3 px-4">Premium</th>
                          <th className="text-center py-3 px-4">Plus</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">AI Apps per month</td>
                          <td className="text-center py-3 px-4">3</td>
                          <td className="text-center py-3 px-4">20</td>
                          <td className="text-center py-3 px-4">
                            <Infinity className="w-4 h-4 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Premium Templates</td>
                          <td className="text-center py-3 px-4">❌</td>
                          <td className="text-center py-3 px-4">✅</td>
                          <td className="text-center py-3 px-4">✅</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Custom Domains</td>
                          <td className="text-center py-3 px-4">❌</td>
                          <td className="text-center py-3 px-4">✅</td>
                          <td className="text-center py-3 px-4">✅</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">API Access</td>
                          <td className="text-center py-3 px-4">❌</td>
                          <td className="text-center py-3 px-4">❌</td>
                          <td className="text-center py-3 px-4">✅</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Support Level</td>
                          <td className="text-center py-3 px-4">Community</td>
                          <td className="text-center py-3 px-4">Priority</td>
                          <td className="text-center py-3 px-4">24/7 Dedicated</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && pendingPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handlePaymentCancel}
          selectedPlan={planDetails[pendingPlan as keyof typeof planDetails]}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}