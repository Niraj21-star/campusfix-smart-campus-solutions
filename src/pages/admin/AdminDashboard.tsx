import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Users,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { IssueTable } from '@/components/dashboard/IssueTable';
import { TrendChart, CategoryDistribution } from '@/components/dashboard/AnalyticsCharts';
import { CampusMap } from '@/components/map/CampusMap';
import { Button } from '@/components/ui/button';
import { issues, users, stats, type Issue } from '@/data/mockData';

const adminUser = users[1]; // Sarah Chen - Admin

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const criticalIssues = issues.filter(i => i.priority === 'critical' && i.status !== 'resolved');

  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-display font-bold">Command Center</h1>
                <p className="text-muted-foreground">
                  Real-time campus operations overview
                </p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Critical Alert Banner */}
            {criticalIssues.length > 0 && (
              <div className="gradient-danger rounded-xl p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">
                      {criticalIssues.length} Critical Issue{criticalIssues.length > 1 ? 's' : ''} Require Attention
                    </p>
                    <p className="text-sm opacity-90">
                      Immediate action recommended
                    </p>
                  </div>
                </div>
                <Button 
                  variant="glass" 
                  size="sm"
                  onClick={() => navigate('/admin/issues?priority=critical')}
                >
                  View All
                </Button>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Issues"
                value={stats.totalIssues}
                subtitle="This month"
                icon={BarChart3}
                trend={{ value: 12, isPositive: false }}
                variant="primary"
              />
              <StatCard
                title="Open Issues"
                value={stats.openIssues}
                subtitle="Pending resolution"
                icon={AlertTriangle}
                trend={{ value: 5, isPositive: false }}
                variant="warning"
              />
              <StatCard
                title="Avg Resolution"
                value={`${stats.avgResolutionTime}h`}
                subtitle="Response time"
                icon={Clock}
                trend={{ value: 8, isPositive: true }}
                variant="success"
              />
              <StatCard
                title="SLA Compliance"
                value={`${stats.slaCompliance}%`}
                subtitle="On-time resolution"
                icon={TrendingUp}
                trend={{ value: 2, isPositive: true }}
                variant="success"
              />
            </div>

            {/* Map and Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Live Map */}
              <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Live Campus Map</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/admin/map')}
                  >
                    Full Screen
                  </Button>
                </div>
                <div className="h-[350px]">
                  <CampusMap
                    selectedIssue={selectedIssue}
                    onIssueSelect={setSelectedIssue}
                  />
                </div>
              </div>

              {/* Category Distribution */}
              <CategoryDistribution />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <TrendChart />
              
              {/* Team Performance */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Team Performance</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Mike Rodriguez', dept: 'Electrical', resolved: 12, pending: 3 },
                    { name: 'Emily Davis', dept: 'Housekeeping', resolved: 18, pending: 2 },
                    { name: 'James Wilson', dept: 'Plumbing', resolved: 8, pending: 5 },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.dept}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">{member.resolved} resolved</p>
                        <p className="text-sm text-muted-foreground">{member.pending} pending</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issues Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold">Recent Issues</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/issues')}
                >
                  View All Issues
                </Button>
              </div>
              <IssueTable onIssueSelect={setSelectedIssue} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
