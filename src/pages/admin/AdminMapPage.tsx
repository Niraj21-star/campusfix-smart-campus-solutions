import { useState } from 'react';
import { Filter, Layers, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CampusMap } from '@/components/map/CampusMap';
import { IssueCard } from '@/components/issues/IssueCard';
import { issues, users, type Issue, type Category, type Priority, type Status } from '@/data/mockData';

const adminUser = users[1];

export default function AdminMapPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: null as Category | null,
    priority: null as Priority | null,
    status: null as Status | null,
  });

  const filteredIssues = issues.filter(issue => {
    if (filters.category && issue.category !== filters.category) return false;
    if (filters.priority && issue.priority !== filters.priority) return false;
    if (filters.status && issue.status !== filters.status) return false;
    return true;
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold">Live Campus Map</h1>
              <Badge variant="secondary">{filteredIssues.length} issues</Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="heatmap"
                  checked={showHeatmap}
                  onCheckedChange={setShowHeatmap}
                />
                <Label htmlFor="heatmap" className="text-sm">
                  <Layers className="h-4 w-4 inline mr-1" />
                  Heatmap
                </Label>
              </div>
              
              <Button
                variant={showFilters ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-b border-border bg-muted/50 px-6 py-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {['cleanliness', 'electrical', 'plumbing', 'safety', 'connectivity', 'infrastructure'].map((cat) => (
                      <Button
                        key={cat}
                        variant={filters.category === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters({ ...filters, category: filters.category === cat ? null : cat as Category })}
                        className="capitalize"
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Priority</Label>
                  <div className="flex flex-wrap gap-2">
                    {['critical', 'high', 'medium', 'low'].map((p) => (
                      <Button
                        key={p}
                        variant={filters.priority === p ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters({ ...filters, priority: filters.priority === p ? null : p as Priority })}
                        className="capitalize"
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {['submitted', 'assigned', 'in-progress', 'resolved'].map((s) => (
                      <Button
                        key={s}
                        variant={filters.status === s ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters({ ...filters, status: filters.status === s ? null : s as Status })}
                        className="capitalize"
                      >
                        {s.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters({ category: null, priority: null, status: null })}
                    className="self-end"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Map Container */}
          <div className="flex-1 flex">
            <div className="flex-1">
              <CampusMap
                selectedIssue={selectedIssue}
                onIssueSelect={setSelectedIssue}
                showHeatmap={showHeatmap}
                filteredIssues={filteredIssues}
              />
            </div>

            {/* Side Panel */}
            {selectedIssue && (
              <div className="w-96 border-l border-border bg-card overflow-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Issue Details</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedIssue(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <IssueCard issue={selectedIssue} />
                  
                  <div className="mt-4 space-y-2">
                    <Button className="w-full">Assign to Staff</Button>
                    <Button variant="outline" className="w-full">Update Status</Button>
                    <Button variant="outline" className="w-full">View Full Details</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
