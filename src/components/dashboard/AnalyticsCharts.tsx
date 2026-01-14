import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { trendData, categoryStats } from '@/data/mockData';

const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1),
  value,
}));

const CATEGORY_COLORS = {
  Cleanliness: '#22C55E',
  Electrical: '#FBBF24',
  Plumbing: '#0EA5E9',
  Safety: '#EF4444',
  Connectivity: '#8B5CF6',
  Infrastructure: '#F97316',
};

export function TrendChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold mb-4">Weekly Trend</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="submitted" name="Submitted" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-sm text-muted-foreground">Submitted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-sm text-muted-foreground">Resolved</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryDistribution() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold mb-4">Issues by Category</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryData.map((entry) => (
                <Cell 
                  key={entry.name} 
                  fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categoryData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded" 
              style={{ backgroundColor: CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS] }}
            />
            <span className="text-xs text-muted-foreground">{entry.name}</span>
            <span className="text-xs font-medium ml-auto">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResolutionTimeChart() {
  const data = [
    { hour: '0-2h', count: 12 },
    { hour: '2-4h', count: 18 },
    { hour: '4-8h', count: 25 },
    { hour: '8-12h', count: 15 },
    { hour: '12-24h', count: 8 },
    { hour: '24h+', count: 4 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold mb-4">Resolution Time Distribution</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="hour" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
