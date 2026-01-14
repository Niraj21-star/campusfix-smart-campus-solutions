import { 
  LayoutDashboard, 
  MapPin, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Users,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { stats } from '@/data/mockData';

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: MapPin, label: 'Live Map', path: '/admin/map' },
  { icon: ClipboardList, label: 'Issues', path: '/admin/issues' },
  { icon: Flame, label: 'Heatmap', path: '/admin/heatmap' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Users, label: 'Team', path: '/admin/team' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'nav-link w-full',
                  isActive && 'nav-link-active'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 px-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <span className="text-sm font-bold text-destructive">{stats.criticalIssues}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-warning/10">
              <div className="flex items-center gap-2 text-warning">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Open</span>
              </div>
              <span className="text-sm font-bold text-warning">{stats.openIssues}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-success/10">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Resolved Today</span>
              </div>
              <span className="text-sm font-bold text-success">{stats.resolvedToday}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-primary/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium">System Status</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All services operational
          </p>
        </div>
      </div>
    </aside>
  );
}
