import { Header } from '@/components/layout/Header';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { IssueTable } from '@/components/dashboard/IssueTable';
import { users } from '@/data/mockData';

const adminUser = users[1];

export default function AdminIssuesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold">All Issues</h1>
              <p className="text-muted-foreground">
                Manage and track all campus issues
              </p>
            </div>

            <IssueTable />
          </div>
        </main>
      </div>
    </div>
  );
}
