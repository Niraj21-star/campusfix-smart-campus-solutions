import { 
  Sparkles,
  Zap,
  Droplets,
  Shield,
  Wifi,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/data/mockData';

const icons: Record<Category, typeof Sparkles> = {
  cleanliness: Sparkles,
  electrical: Zap,
  plumbing: Droplets,
  safety: Shield,
  connectivity: Wifi,
  infrastructure: Building2,
};

interface CategoryIconProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
  className?: string;
}

export function CategoryIcon({ 
  category, 
  size = 'md', 
  showBackground = true,
  className 
}: CategoryIconProps) {
  const Icon = icons[category];
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  if (!showBackground) {
    return (
      <Icon className={cn(
        sizeClasses[size],
        `text-category-${category}`,
        className
      )} />
    );
  }

  return (
    <div className={cn(
      'rounded-lg',
      containerSizes[size],
      `bg-category-${category}/10`,
      className
    )}>
      <Icon className={cn(
        sizeClasses[size],
        `text-category-${category}`
      )} />
    </div>
  );
}
