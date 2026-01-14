import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  Upload, 
  X, 
  CheckCircle2,
  Sparkles,
  Zap,
  Droplets,
  Shield,
  Wifi,
  Building2,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { users, type Category } from '@/data/mockData';
import { cn } from '@/lib/utils';

const currentUser = users[0];

const categories: { id: Category; label: string; icon: typeof Sparkles; description: string }[] = [
  { id: 'cleanliness', label: 'Cleanliness', icon: Sparkles, description: 'Spills, trash, hygiene' },
  { id: 'electrical', label: 'Electrical', icon: Zap, description: 'Lights, outlets, AC' },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets, description: 'Leaks, drains, water' },
  { id: 'safety', label: 'Safety', icon: Shield, description: 'Hazards, security' },
  { id: 'connectivity', label: 'Connectivity', icon: Wifi, description: 'WiFi, network' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2, description: 'Doors, windows' },
];

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '' as Category | '',
    title: '',
    description: '',
    location: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const ticketId = `CF-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    
    toast({
      title: "Issue Reported Successfully! 🎉",
      description: `Your ticket ID is ${ticketId}. We'll notify you of updates.`,
    });
    
    navigate('/student');
    setIsSubmitting(false);
  };

  const canProceed = () => {
    if (step === 1) return formData.category !== '';
    if (step === 2) return formData.title.trim() !== '';
    return true;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header user={currentUser} />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/student')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {step > 1 ? 'Back' : 'Cancel'}
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={cn(
                'flex-1 h-1.5 rounded-full transition-colors',
                s <= step ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-display font-bold mb-2">What type of issue?</h1>
            <p className="text-muted-foreground mb-6">
              Select the category that best describes the problem.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all duration-200',
                    formData.category === cat.id 
                      ? 'border-primary bg-primary/5 shadow-glow' 
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'rounded-lg p-2 w-fit mb-3',
                    `bg-category-${cat.id}/10`
                  )}>
                    <cat.icon className={cn('h-5 w-5', `text-category-${cat.id}`)} />
                  </div>
                  <h3 className="font-semibold">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold mb-2">Describe the issue</h1>
              <p className="text-muted-foreground">
                Provide details to help us understand and fix the problem faster.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Broken light in Room 204"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about the issue..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Building, room, or area"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Use current location
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photo */}
        {step === 3 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold mb-2">Add a photo</h1>
              <p className="text-muted-foreground">
                A photo helps us identify and prioritize the issue.
              </p>
            </div>

            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-border">
                  <img 
                    src={imagePreview} 
                    alt="Issue preview" 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="gradient-hero rounded-full p-4 w-fit mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-medium mb-1">Take or upload a photo</p>
                    <p className="text-sm text-muted-foreground">
                      Click to capture or select from your device
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {/* Summary */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold">Report Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium">{formData.title}</span>
                  </div>
                  {formData.location && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{formData.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step < 3 ? (
            <Button 
              variant="hero" 
              className="flex-1"
              disabled={!canProceed()}
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button 
              variant="hero" 
              className="flex-1"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
