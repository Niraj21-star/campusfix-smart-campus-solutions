import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryIcon } from '@/components/issues/CategoryIcon';
import { issues, type Issue, type Category, type Priority, type Status } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const statusLabels: Record<Status, string> = {
  submitted: 'Submitted',
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
};

const priorityLabels: Record<Priority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const categoryLabels: Record<Category, string> = {
  cleanliness: 'Cleanliness',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  safety: 'Safety',
  connectivity: 'Connectivity',
  infrastructure: 'Infrastructure',
};

interface IssueTableProps {
  onIssueSelect?: (issue: Issue) => void;
}

export function IssueTable({ onIssueSelect }: IssueTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'priority'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredIssues = issues
    .filter(issue => {
      if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !issue.ticketId.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
      if (priorityFilter !== 'all' && issue.priority !== priorityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortField === 'createdAt') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return sortOrder === 'desc'
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const toggleSort = (field: 'createdAt' | 'priority') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ticket ID or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Priorities</SelectItem>
                {Object.entries(priorityLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredIssues.length} issues found</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Ticket</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Issue</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => toggleSort('priority')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Priority
                  {sortField === 'priority' && (
                    sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => toggleSort('createdAt')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Created
                  {sortField === 'createdAt' && (
                    sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.slice(0, 10).map((issue) => (
              <tr 
                key={issue.id} 
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onIssueSelect?.(issue)}
              >
                <td className="p-4">
                  <span className="font-mono text-sm font-medium">{issue.ticketId}</span>
                </td>
                <td className="p-4">
                  <div className="max-w-[250px]">
                    <p className="font-medium truncate">{issue.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{issue.location}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={issue.category} size="sm" />
                    <span className="text-sm">{categoryLabels[issue.category]}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={issue.priority as any}>
                    {priorityLabels[issue.priority]}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={issue.status as any}>
                    {statusLabels[issue.status]}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                </td>
                <td className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Escalate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
