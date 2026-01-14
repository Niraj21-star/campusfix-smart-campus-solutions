import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Wrench, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Account created!",
      description: "Welcome to CampusFix. Let's get started.",
    });
    
    navigate('/student');
    setIsLoading(false);
  };

  const passwordStrength = formData.password.length > 0 ? (
    formData.password.length >= 8 ? 'strong' : formData.password.length >= 5 ? 'medium' : 'weak'
  ) : null;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <div className="flex items-center gap-2 mb-8">
            <div className="gradient-hero rounded-lg p-1.5">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">CampusFix</span>
          </div>

          <h1 className="text-3xl font-display font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            Join CampusFix and start reporting issues today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Campus Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@campus.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordStrength && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength === 'strong' ? 'w-full bg-success' :
                        passwordStrength === 'medium' ? 'w-2/3 bg-warning' : 'w-1/3 bg-destructive'
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-medium capitalize ${
                    passwordStrength === 'strong' ? 'text-success' :
                    passwordStrength === 'medium' ? 'text-warning' : 'text-destructive'
                  }`}>
                    {passwordStrength}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                'Report campus issues in seconds',
                'Track repair progress in real-time',
                'Get notified when issues are resolved',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-display font-bold mb-4">
            Join Thousands of Campus Members
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Be part of the movement to make campus maintenance smarter and faster.
          </p>
          <div className="space-y-4">
            {[
              'Instant photo-based reporting',
              'Real-time status updates',
              'Community upvoting for priority issues',
              'Direct communication with staff',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
