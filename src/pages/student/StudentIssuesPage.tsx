import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssueCard } from '@/components/issues/IssueCard';
import { issues, users, type Status } from '@/data/mockData';

const currentUser = users[0];

const statusTabs: { id: Status | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
];

export default function StudentIssuesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Status | 'all'>('all');

  const myIssues = issues.filter(i => i.reportedBy === currentUser.id);
  
  const filteredIssues = myIssues.filter(issue => {
    if (activeTab !== 'all' && issue.status !== activeTab) return false;
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getCountByStatus = (status: Status | 'all') => {
    if (status === 'all') return myIssues.length;
    return myIssues.filter(i => i.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header user={currentUser} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold">My Issues</h1>
            <p className="text-muted-foreground">Track the status of your reported issues</p>
          </div>
          <Button variant="hero" onClick={() => navigate('/student/report')}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Status | 'all')}>
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            {statusTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                {tab.label}
                <Badge variant="secondary" className="text-xs">
                  {getCountByStatus(tab.id)}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {myIssues.length === 0 
                    ? "You haven't reported any issues yet."
                    : "No issues found matching your criteria."}
                </p>
                {myIssues.length === 0 && (
                  <Button variant="default" onClick={() => navigate('/student/report')}>
                    Report Your First Issue
                  </Button>
                )}
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={() => navigate(`/student/issues/${issue.id}`)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  );
}
