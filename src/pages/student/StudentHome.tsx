import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/button';
import { IssueCard } from '@/components/issues/IssueCard';
import { CampusMap } from '@/components/map/CampusMap';
import { issues, users, stats } from '@/data/mockData';

const currentUser = users[0]; // Alex Johnson - Student

export default function StudentHome() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const myIssues = issues.filter(i => i.reportedBy === currentUser.id).slice(0, 3);
  const recentIssues = issues.slice(0, 5);
  const nearbyIssues = issues.slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header user={currentUser} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="gradient-hero rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Good morning, {currentUser.name.split(' ')[0]}! 👋
              </h1>
              <p className="opacity-90">
                Help keep campus running smoothly. Report issues in seconds.
              </p>
            </div>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => navigate('/student/report')}
              className="flex-shrink-0"
            >
              <Plus className="h-5 w-5 mr-2" />
              Report Issue
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { icon: AlertTriangle, value: stats.openIssues, label: 'Open Issues' },
              { icon: Clock, value: `${stats.avgResolutionTime}h`, label: 'Avg Resolution' },
              { icon: CheckCircle2, value: stats.resolvedToday, label: 'Resolved Today' },
              { icon: TrendingUp, value: `${stats.slaCompliance}%`, label: 'SLA Rate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <stat.icon className="h-5 w-5 mb-2 opacity-75" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Issues */}
            {myIssues.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-semibold">My Reports</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/student/issues')}
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  {myIssues.map((issue) => (
                    <IssueCard 
                      key={issue.id} 
                      issue={issue} 
                      compact
                      onClick={() => navigate(`/student/issues/${issue.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Campus Map */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold">Campus Map</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/student/map')}
                >
                  Full Map <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="h-[350px] rounded-xl overflow-hidden border border-border">
                <CampusMap 
                  filteredIssues={nearbyIssues}
                  onIssueSelect={(issue) => setSelectedIssue(issue)}
                />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => navigate('/student/report')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Report New Issue
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/student/map')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View Campus Map
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/student/issues')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Track My Issues
                </Button>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h3 className="font-semibold mb-4">Recent Campus Issues</h3>
              <div className="space-y-3">
                {recentIssues.map((issue) => (
                  <div 
                    key={issue.id}
                    onClick={() => navigate(`/student/issues/${issue.id}`)}
                    className="bg-card rounded-lg p-4 border border-border card-hover cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{issue.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{issue.location}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {issue.upvotes} votes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
