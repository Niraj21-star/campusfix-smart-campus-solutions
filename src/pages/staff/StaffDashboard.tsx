import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Navigation,
  Camera,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IssueCard } from '@/components/issues/IssueCard';
import { CampusMap } from '@/components/map/CampusMap';
import { issues, users, type Issue } from '@/data/mockData';

const staffUser = users[2]; // Mike Rodriguez - Staff

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const assignedIssues = issues.filter(
    i => i.assignedTo === staffUser.id && i.status !== 'resolved'
  );

  const inProgressIssues = assignedIssues.filter(i => i.status === 'in-progress');
  const pendingIssues = assignedIssues.filter(i => i.status === 'assigned');

  return (
    <div className="min-h-screen bg-background">
      <Header user={staffUser} />
      
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold">My Assignments</h1>
          <p className="text-muted-foreground">
            {assignedIssues.length} issues assigned to you
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-3xl font-bold text-warning mb-1">
              {pendingIssues.length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {inProgressIssues.length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-3xl font-bold text-success mb-1">
              8
            </div>
            <div className="text-sm text-muted-foreground">Resolved Today</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Issue List */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Assigned Issues</h2>
            
            {assignedIssues.length === 0 ? (
              <div className="bg-card rounded-xl p-8 border border-border text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-success mb-4" />
                <h3 className="font-semibold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">
                  No pending issues assigned to you.
                </p>
              </div>
            ) : (
              assignedIssues.map((issue) => (
                <div 
                  key={issue.id}
                  className={`bg-card rounded-xl border-2 transition-all cursor-pointer ${
                    selectedIssue?.id === issue.id 
                      ? 'border-primary shadow-glow' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge variant={issue.priority as any} className="mb-2">
                          {issue.priority}
                        </Badge>
                        <h3 className="font-semibold">{issue.title}</h3>
                      </div>
                      <Badge variant={issue.status as any}>
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>SLA: {issue.slaHours}h</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate logic
                        }}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      {issue.status === 'assigned' && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Start work logic
                          }}
                        >
                          Start Work
                        </Button>
                      )}
                      {issue.status === 'in-progress' && (
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Mark resolved logic
                          }}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Location Map</h2>
            <div className="h-[500px] rounded-xl overflow-hidden border border-border sticky top-24">
              <CampusMap
                selectedIssue={selectedIssue}
                onIssueSelect={setSelectedIssue}
                filteredIssues={assignedIssues}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
