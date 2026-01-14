import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Wrench, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in.",
    });
    
    // Route based on demo accounts
    if (email.includes('admin')) {
      navigate('/admin');
    } else if (email.includes('staff')) {
      navigate('/staff');
    } else {
      navigate('/student');
    }
    
    setIsLoading(false);
  };

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

          <h1 className="text-3xl font-display font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button 
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-mono">student@campus.edu</span> - Student view</p>
              <p><span className="font-mono">admin@campus.edu</span> - Admin dashboard</p>
              <p><span className="font-mono">staff@campus.edu</span> - Field staff portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-display font-bold mb-4">
            The Smart Campus Operating System
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Report issues in seconds, track progress in real-time, and keep your campus running smoothly.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '< 10s', label: 'Report Time' },
              { value: '94%', label: 'SLA Compliance' },
              { value: '4.2h', label: 'Avg Resolution' },
              { value: '24/7', label: 'Monitoring' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
