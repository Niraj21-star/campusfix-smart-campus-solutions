import { Header } from '@/components/layout/Header';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrendChart, CategoryDistribution, ResolutionTimeChart } from '@/components/dashboard/AnalyticsCharts';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  AlertTriangle,
  Users
} from 'lucide-react';
import { users, stats, departments } from '@/data/mockData';

const adminUser = users[1];

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Analytics</h1>
              <p className="text-muted-foreground">
                Campus maintenance performance insights
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Issues"
                value={stats.totalIssues}
                subtitle="This month"
                icon={BarChart3}
                trend={{ value: 12, isPositive: false }}
              />
              <StatCard
                title="Resolution Rate"
                value="87%"
                subtitle="Issues resolved"
                icon={CheckCircle2}
                trend={{ value: 5, isPositive: true }}
                variant="success"
              />
              <StatCard
                title="Avg Response Time"
                value="1.2h"
                subtitle="First response"
                icon={Clock}
                trend={{ value: 15, isPositive: true }}
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

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <TrendChart />
              <CategoryDistribution />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ResolutionTimeChart />
              
              {/* Department Performance */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {departments.map((dept) => {
                    const compliance = Math.floor(80 + Math.random() * 18);
                    return (
                      <div key={dept.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {compliance}% SLA
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${compliance}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hotspots */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Issue Hotspots</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { location: 'Main Library - 2nd Floor', count: 12, change: '+3' },
                  { location: 'Student Union - Cafeteria', count: 8, change: '-2' },
                  { location: 'Engineering Building A', count: 7, change: '+1' },
                  { location: 'Dormitory Block C', count: 6, change: '0' },
                  { location: 'Science Lab Complex', count: 5, change: '+2' },
                  { location: 'Sports Complex - Gym', count: 4, change: '-1' },
                ].map((hotspot, idx) => (
                  <div 
                    key={hotspot.location}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm font-bold text-destructive">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{hotspot.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {hotspot.count} issues
                        <span className={`ml-2 ${
                          hotspot.change.startsWith('+') ? 'text-destructive' : 
                          hotspot.change.startsWith('-') ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {hotspot.change}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
