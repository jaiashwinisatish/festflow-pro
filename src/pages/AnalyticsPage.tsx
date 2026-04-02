import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader, StatCard } from '@/components/dashboard/SharedComponents';
import { analyticsData } from '@/data/mockData';
import { Users, DollarSign, TrendingUp, CalendarDays } from 'lucide-react';

const revenueData = [
  { date: 'Mar 17', revenue: 12000 }, { date: 'Mar 18', revenue: 25000 }, { date: 'Mar 19', revenue: 18000 },
  { date: 'Mar 20', revenue: 32000 }, { date: 'Mar 21', revenue: 28000 }, { date: 'Mar 22', revenue: 45000 },
  { date: 'Mar 23', revenue: 22000 }, { date: 'Mar 24', revenue: 38000 }, { date: 'Mar 25', revenue: 15000 },
  { date: 'Mar 26', revenue: 8000 }, { date: 'Mar 27', revenue: 2000 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" description="Comprehensive fest analytics and insights" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Registrations" value={analyticsData.totalRegistrations} icon={Users} trend="+12%" trendUp />
        <StatCard title="Revenue" value={`₹${analyticsData.totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+8%" trendUp />
        <StatCard title="Events" value={analyticsData.totalEvents} icon={CalendarDays} />
        <StatCard title="Attendance" value={`${analyticsData.totalAttendance}`} icon={TrendingUp} trend="+5%" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Daily Registrations</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analyticsData.dailyRegistrations}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="count" stroke="hsl(262, 83%, 58%)" fill="url(#colorCount)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={{ fill: 'hsl(199, 89%, 48%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Registrations by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={analyticsData.registrationsByCategory} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {analyticsData.registrationsByCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">Attendance by Event</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.attendanceByEvent}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="event" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="present" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
