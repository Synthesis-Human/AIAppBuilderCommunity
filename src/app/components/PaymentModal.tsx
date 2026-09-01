import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Crown,
  Zap
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
    icon: any;
    color: string;
    features: string[];
  };
  onPaymentSuccess: (plan: string) => void;
}

export function PaymentModal({ isOpen, onClose, selectedPlan, onPaymentSuccess }: PaymentModalProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US"
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Detect card type based on card number
  const detectCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^2[2-7]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6(?:011|5)/.test(number)) return 'discover';
    if (/^(?:2131|1800|35)/.test(number)) return 'jcb';
    if (/^3(?:0[0-5]|[68])/.test(number)) return 'dinersclub';
    
    return 'unknown';
  };

  const cardType = detectCardType(paymentData.cardNumber);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    }
    
    setPaymentData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!paymentData.expiryMonth) {
      newErrors.expiryMonth = 'Required';
    }

    if (!paymentData.expiryYear) {
      newErrors.expiryYear = 'Required';
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    if (!paymentData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Welcome to ${selectedPlan.name}!`, {
        description: `Your payment was successful. You now have access to all ${selectedPlan.name} features.`,
      });
      onPaymentSuccess(selectedPlan.name.toLowerCase());
      onClose();
    }, 3000);
  };

  const cardLogos = {
    visa: { emoji: "💳", color: "#1A1F71", name: "Visa" },
    mastercard: { emoji: "💳", color: "#FF5F00", name: "Mastercard" },
    amex: { emoji: "💳", color: "#006FCF", name: "American Express" },
    discover: { emoji: "💳", color: "#FF6000", name: "Discover" },
    jcb: { emoji: "💳", color: "#0066B2", name: "JCB" },
    dinersclub: { emoji: "💳", color: "#0079BE", name: "Diners Club" },
    unknown: { emoji: "💳", color: "#666666", name: "Credit Card" }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <selectedPlan.icon className={`w-5 h-5 ${selectedPlan.color}`} />
            Upgrade to {selectedPlan.name}
          </DialogTitle>
          <DialogDescription>
            Complete your payment to unlock all {selectedPlan.name} features
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>{selectedPlan.name} Plan</span>
                  <span className="font-semibold">{selectedPlan.price}/month</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What's included:</h4>
                  <ul className="space-y-1">
                    {selectedPlan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {selectedPlan.features.length > 4 && (
                      <li className="text-sm text-gray-500">
                        +{selectedPlan.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>

                <Separator />

                <div className="flex items-center justify-between font-semibold">
                  <span>Total Today</span>
                  <span>{selectedPlan.price}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4" />
                  30-day money back guarantee
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Accepted Cards */}
              <div>
                <Label className="text-sm font-medium">We Accept All Major Cards</Label>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge variant="outline" className="px-3 py-1 border-blue-200">
                    💳 <span style={{ color: "#1A1F71" }}>Visa</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-orange-200">
                    💳 <span style={{ color: "#FF5F00" }}>Mastercard</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-blue-200">
                    💳 <span style={{ color: "#006FCF" }}>Amex</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-orange-200">
                    💳 <span style={{ color: "#FF6000" }}>Discover</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-blue-200">
                    💳 <span style={{ color: "#0066B2" }}>JCB</span>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-blue-200">
                    💳 <span style={{ color: "#0079BE" }}>Diners</span>
                  </Badge>
                </div>
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      maxLength={19}
                      className={errors.cardNumber ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <span className="text-lg">{cardLogos[cardType].emoji}</span>
                      {cardType !== 'unknown' && (
                        <span className="text-xs font-medium" style={{ color: cardLogos[cardType].color }}>
                          {cardLogos[cardType].name}
                        </span>
                      )}
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Month</Label>
                    <Select
                      value={paymentData.expiryMonth}
                      onValueChange={(value) => handleInputChange('expiryMonth', value)}
                    >
                      <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map(month => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Year</Label>
                    <Select
                      value={paymentData.expiryYear}
                      onValueChange={(value) => handleInputChange('expiryYear', value)}
                    >
                      <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      className={errors.cvv ? 'border-red-500' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className={errors.cardholderName ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              {/* Billing Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Billing Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={paymentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={paymentData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={paymentData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={paymentData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      value={paymentData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={paymentData.country}
                      onValueChange={(value) => handleInputChange('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Payment</h4>
                    <p className="text-sm text-blue-700">
                      Your payment information is encrypted and secure. We never store your credit card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-1 ${
                    selectedPlan.name === 'Premium' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay {selectedPlan.price}/month
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}