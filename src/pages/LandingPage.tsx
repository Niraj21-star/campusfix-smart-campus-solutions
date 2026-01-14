import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  Clock, 
  BarChart3, 
  Users, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Camera,
    title: 'Snap & Report',
    description: 'Report issues in under 10 seconds with photo capture and auto-location detection.',
  },
  {
    icon: MapPin,
    title: 'Live Campus Map',
    description: 'See all issues on an interactive map with real-time status updates.',
  },
  {
    icon: Zap,
    title: 'Smart Routing',
    description: 'AI-powered categorization automatically routes issues to the right department.',
  },
  {
    icon: Clock,
    title: 'SLA Tracking',
    description: 'Automated escalation ensures critical issues never fall through the cracks.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Gain insights with heatmaps, trend analysis, and performance metrics.',
  },
  {
    icon: Users,
    title: 'Team Coordination',
    description: 'Seamless handoffs between students, admins, and field staff.',
  },
];

const stats = [
  { value: '< 10s', label: 'Average Report Time' },
  { value: '4.2h', label: 'Avg Resolution Time' },
  { value: '94%', label: 'SLA Compliance' },
  { value: '50+', label: 'Daily Reports' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-hero rounded-lg p-1.5">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">CampusFix</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="hero" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              The Smart Campus Operating System
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Campus Issues,{' '}
              <span className="text-gradient">Instantly Solved</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform how your campus handles maintenance. Report in seconds, 
              track in real-time, resolve faster. Powered by AI and built for modern campuses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/student')}
                className="w-full sm:w-auto"
              >
                Report an Issue
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => navigate('/admin')}
                className="w-full sm:w-auto"
              >
                View Admin Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Keep Campus Running
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete platform for reporting, tracking, and resolving campus issues efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border card-hover"
              >
                <div className="gradient-hero rounded-xl p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How CampusFix Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to a better campus experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Snap & Report', desc: 'Take a photo, drop a pin, describe the issue.' },
              { step: '02', title: 'Auto-Route', desc: 'AI categorizes and routes to the right team.' },
              { step: '03', title: 'Track & Resolve', desc: 'Get real-time updates until resolution.' },
            ].map((item, idx) => (
              <div key={item.step} className="relative text-center">
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                {idx < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-8 w-8 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Transform Your Campus?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join hundreds of campuses already using CampusFix to streamline maintenance operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="glass" 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/admin')}
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="gradient-hero rounded-lg p-1.5">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold">CampusFix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CampusFix. Built for smarter campuses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
