import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CampusMap } from '@/components/map/CampusMap';
import { IssueCard } from '@/components/issues/IssueCard';
import { issues, users, type Issue, type Category, type Priority } from '@/data/mockData';
import { cn } from '@/lib/utils';

const currentUser = users[0];

const categoryFilters: { id: Category; label: string }[] = [
  { id: 'cleanliness', label: 'Cleanliness' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'safety', label: 'Safety' },
  { id: 'connectivity', label: 'Connectivity' },
  { id: 'infrastructure', label: 'Infrastructure' },
];

const priorityFilters: { id: Priority; label: string }[] = [
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
];

export default function StudentMapPage() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<Priority | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredIssues = issues.filter(issue => {
    if (categoryFilter && issue.category !== categoryFilter) return false;
    if (priorityFilter && issue.priority !== priorityFilter) return false;
    if (issue.status === 'resolved') return false;
    return true;
  });

  const activeFilters = [categoryFilter, priorityFilter].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header user={currentUser} />
      
      <main className="h-[calc(100vh-4rem-5rem)] md:h-[calc(100vh-4rem)] flex flex-col">
        {/* Filters Bar */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="container mx-auto flex items-center gap-3">
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilters > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters}
                </Badge>
              )}
            </Button>

            {(categoryFilter || priorityFilter) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCategoryFilter(null);
                  setPriorityFilter(null);
                }}
              >
                Clear all
              </Button>
            )}

            <div className="flex-1" />
            
            <span className="text-sm text-muted-foreground">
              {filteredIssues.length} issues
            </span>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="container mx-auto mt-3 space-y-3 animate-slide-in-up">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categoryFilters.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={categoryFilter === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(categoryFilter === cat.id ? null : cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Priority</p>
                <div className="flex flex-wrap gap-2">
                  {priorityFilters.map((p) => (
                    <Button
                      key={p.id}
                      variant={priorityFilter === p.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPriorityFilter(priorityFilter === p.id ? null : p.id)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map and Detail Panel */}
        <div className="flex-1 flex">
          {/* Map */}
          <div className="flex-1 relative">
            <CampusMap
              selectedIssue={selectedIssue}
              onIssueSelect={setSelectedIssue}
              filteredIssues={filteredIssues}
            />
          </div>

          {/* Side Panel - Desktop */}
          {selectedIssue && (
            <div className="hidden md:block w-96 border-l border-border bg-card overflow-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Issue Details</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedIssue(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <IssueCard 
                  issue={selectedIssue} 
                  onClick={() => navigate(`/student/issues/${selectedIssue.id}`)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sheet - Mobile */}
        {selectedIssue && (
          <div className="md:hidden fixed bottom-20 left-0 right-0 bg-card border-t border-border p-4 animate-slide-in-up">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Issue Details</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedIssue(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <IssueCard 
              issue={selectedIssue} 
              compact
              onClick={() => navigate(`/student/issues/${selectedIssue.id}`)}
            />
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
