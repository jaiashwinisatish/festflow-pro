import { motion } from 'framer-motion';
import { Users, DollarSign, CalendarDays, UserCheck, TrendingUp, Lightbulb, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard, PageHeader } from '@/components/dashboard/SharedComponents';
import { analyticsData, mockActivityLog, mockRegistrations, mockEvents } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" description="Overview of fest management analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registrations" value={analyticsData.totalRegistrations} icon={Users} trend="+12% from yesterday" trendUp />
        <StatCard title="Revenue" value={`₹${analyticsData.totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+8% this week" trendUp />
        <StatCard title="Total Events" value={analyticsData.totalEvents} icon={CalendarDays} />
        <StatCard title="Attendance Rate" value="83%" icon={UserCheck} trend="+5%" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Registration Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.dailyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Registrations by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={analyticsData.registrationsByCategory} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {analyticsData.registrationsByCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {[
              { text: 'Technical events have 40% higher registration rate. Consider adding more.', type: 'success' },
              { text: 'Valorant Championship is 90% full. Consider increasing capacity or waitlist.', type: 'warning' },
              { text: 'Payment completion rate is 85%. Send reminders to pending payments.', type: 'info' },
              { text: 'Peak registration time: 10AM-2PM. Schedule promotions accordingly.', type: 'info' },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <TrendingUp className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <p className="text-sm">{insight.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-accent" />
            <h3 className="font-semibold">Activity Log</h3>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockActivityLog.map(log => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p>{log.action}</p>
                  <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ParticipantDashboard() {
  const myRegs = mockRegistrations.slice(0, 3);
  return (
    <div className="space-y-6">
      <PageHeader title="My Dashboard" description="Welcome back! Here's your fest overview." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="My Registrations" value={3} icon={Users} />
        <StatCard title="Upcoming Events" value={5} icon={CalendarDays} />
        <StatCard title="Certificates" value={1} icon={UserCheck} />
      </div>
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-4">My Registrations</h3>
        <div className="space-y-3">
          {myRegs.map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium text-sm">{r.eventTitle}</p>
                <p className="text-xs text-muted-foreground">{r.type} • {new Date(r.registeredAt).toLocaleDateString()}</p>
              </div>
              <Badge variant={r.status === 'approved' ? 'default' : 'secondary'} className="capitalize text-xs">
                {r.status.replace(/_/g, ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoordinatorDashboard() {
  const myEvents = mockEvents.slice(0, 4);
  return (
    <div className="space-y-6">
      <PageHeader title="Coordinator Dashboard" description="Manage your assigned events" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Assigned Events" value={4} icon={CalendarDays} />
        <StatCard title="Total Participants" value={186} icon={Users} />
        <StatCard title="Avg Attendance" value="87%" icon={UserCheck} />
      </div>
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-4">My Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myEvents.map(e => (
            <div key={e.id} className="p-4 rounded-xl border border-border/50 bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs capitalize">{e.category}</Badge>
                <span className="text-xs text-muted-foreground">{e.registeredCount}/{e.maxParticipants}</span>
              </div>
              <h4 className="font-semibold">{e.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{e.date} • {e.venue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'participant' && <ParticipantDashboard />}
      {user?.role === 'coordinator' && <CoordinatorDashboard />}
    </DashboardLayout>
  );
}
