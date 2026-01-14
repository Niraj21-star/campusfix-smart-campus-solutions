import { useEffect, useRef } from 'react';
import { issues, type Issue, type Priority } from '@/data/mockData';
import { cn } from '@/lib/utils';

const priorityColors: Record<Priority, string> = {
  critical: '#EA4335',
  high: '#F97316',
  medium: '#FBBF24',
  low: '#22C55E',
};

interface CampusMapProps {
  selectedIssue?: Issue | null;
  onIssueSelect?: (issue: Issue) => void;
  showHeatmap?: boolean;
  className?: string;
  filteredIssues?: Issue[];
}

export function CampusMap({ 
  selectedIssue, 
  onIssueSelect, 
  showHeatmap = false,
  className,
  filteredIssues
}: CampusMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const displayIssues = filteredIssues || issues;

  // Campus bounds for positioning
  const bounds = {
    minLat: 37.42,
    maxLat: 37.435,
    minLng: -122.18,
    maxLng: -122.16,
  };

  const latToY = (lat: number) => {
    const percentage = (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
    return (1 - percentage) * 100;
  };

  const lngToX = (lng: number) => {
    const percentage = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
    return percentage * 100;
  };

  return (
    <div 
      ref={mapRef}
      className={cn(
        'relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-blue-50',
        className
      )}
    >
      {/* Campus background illustration */}
      <div className="absolute inset-0 opacity-30">
        {/* Grid pattern */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stylized campus buildings */}
      <div className="absolute inset-0">
        {/* Main quad */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 border-2 border-dashed border-green-300 rounded-lg opacity-50" />
        
        {/* Buildings represented as rectangles */}
        <div className="absolute top-[15%] left-[20%] w-16 h-12 bg-slate-300/50 rounded shadow-sm" />
        <div className="absolute top-[20%] right-[25%] w-20 h-10 bg-slate-300/50 rounded shadow-sm" />
        <div className="absolute bottom-[30%] left-[15%] w-14 h-16 bg-slate-300/50 rounded shadow-sm" />
        <div className="absolute bottom-[25%] right-[20%] w-18 h-12 bg-slate-300/50 rounded shadow-sm" />
        <div className="absolute top-[45%] left-[40%] w-24 h-14 bg-slate-400/50 rounded shadow-sm" />

        {/* Roads */}
        <div className="absolute top-0 left-1/2 w-1 h-full bg-slate-400/30 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-400/30 -translate-y-1/2" />
      </div>

      {/* Heatmap overlay */}
      {showHeatmap && (
        <div className="absolute inset-0 pointer-events-none">
          {displayIssues.map((issue, index) => (
            <div
              key={`heat-${issue.id}`}
              className="absolute rounded-full blur-xl opacity-40"
              style={{
                left: `${lngToX(issue.lng)}%`,
                top: `${latToY(issue.lat)}%`,
                width: '80px',
                height: '80px',
                backgroundColor: priorityColors[issue.priority],
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Issue pins */}
      {displayIssues.map((issue) => {
        const isSelected = selectedIssue?.id === issue.id;
        const isResolved = issue.status === 'resolved';
        
        return (
          <button
            key={issue.id}
            onClick={() => onIssueSelect?.(issue)}
            className={cn(
              'absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200',
              isSelected ? 'scale-150 z-20' : 'hover:scale-125',
              isResolved && 'opacity-50'
            )}
            style={{
              left: `${lngToX(issue.lng)}%`,
              top: `${latToY(issue.lat)}%`,
            }}
          >
            <div 
              className={cn(
                'w-4 h-4 rounded-full border-2 border-white shadow-lg',
                isSelected && 'ring-4 ring-primary/30'
              )}
              style={{ backgroundColor: priorityColors[issue.priority] }}
            >
              {issue.priority === 'critical' && !isResolved && (
                <span className="absolute inset-0 rounded-full animate-ping opacity-75" 
                  style={{ backgroundColor: priorityColors[issue.priority] }} 
                />
              )}
            </div>
          </button>
        );
      })}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
        <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Priority</h4>
        <div className="space-y-1.5">
          {Object.entries(priorityColors).map(([priority, color]) => (
            <div key={priority} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm" 
                style={{ backgroundColor: color }}
              />
              <span className="text-xs capitalize">{priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-card rounded-lg shadow-lg border border-border flex items-center justify-center text-lg font-bold text-muted-foreground hover:bg-accent transition-colors">
          +
        </button>
        <button className="w-8 h-8 bg-card rounded-lg shadow-lg border border-border flex items-center justify-center text-lg font-bold text-muted-foreground hover:bg-accent transition-colors">
          −
        </button>
      </div>

      {/* Campus name */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border">
        <span className="text-sm font-medium">Stanford Campus</span>
      </div>
    </div>
  );
}
