import { 
  MapPin, 
  Clock, 
  ThumbsUp, 
  ChevronRight,
  Sparkles,
  Zap,
  Droplets,
  Shield,
  Wifi,
  Building2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Issue, Category } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const categoryIcons: Record<Category, typeof Sparkles> = {
  cleanliness: Sparkles,
  electrical: Zap,
  plumbing: Droplets,
  safety: Shield,
  connectivity: Wifi,
  infrastructure: Building2,
};

const categoryLabels: Record<Category, string> = {
  cleanliness: 'Cleanliness',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  safety: 'Safety',
  connectivity: 'Connectivity',
  infrastructure: 'Infrastructure',
};

const priorityLabels = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const statusLabels = {
  submitted: 'Submitted',
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
};

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  compact?: boolean;
}

export function IssueCard({ issue, onClick, compact = false }: IssueCardProps) {
  const CategoryIcon = categoryIcons[issue.category];
  const timeAgo = formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true });

  if (compact) {
    return (
      <Card 
        className="card-hover cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              'rounded-lg p-2',
              `bg-category-${issue.category}/10`
            )}>
              <CategoryIcon className={cn(
                'h-5 w-5',
                `text-category-${issue.category}`
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {issue.ticketId}
                </span>
                <Badge variant={issue.status as any} className="text-[10px]">
                  {statusLabels[issue.status]}
                </Badge>
              </div>
              <h4 className="font-medium text-sm truncate">{issue.title}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{issue.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="card-hover cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                'rounded-lg p-2.5',
                `bg-category-${issue.category}/10`
              )}>
                <CategoryIcon className={cn(
                  'h-5 w-5',
                  `text-category-${issue.category}`
                )} />
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground block">
                  {issue.ticketId}
                </span>
                <Badge variant={issue.category as any} className="text-xs mt-0.5">
                  {categoryLabels[issue.category]}
                </Badge>
              </div>
            </div>
            <Badge variant={issue.priority as any}>
              {priorityLabels[issue.priority]}
            </Badge>
          </div>

          <h3 className="font-semibold text-base mb-2">{issue.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {issue.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-[150px]">{issue.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{timeAgo}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <Badge variant={issue.status as any}>
              {statusLabels[issue.status]}
            </Badge>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>{issue.upvotes}</span>
              </button>
              <Button variant="ghost" size="sm" className="gap-1">
                View <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
