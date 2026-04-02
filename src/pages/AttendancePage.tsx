import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, UserCheck, Download, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader, StatusBadge } from '@/components/dashboard/SharedComponents';
import { mockAttendance, analyticsData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const pieData = [
  { name: 'Present', value: 289, color: 'hsl(142, 76%, 36%)' },
  { name: 'Absent', value: 58, color: 'hsl(0, 84%, 60%)' },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(mockAttendance);
  const [scanning, setScanning] = useState(false);

  const togglePresent = (id: string) => {
    setAttendance(prev => prev.map(a => a.id === id ? { ...a, present: !a.present, checkInTime: !a.present ? new Date().toISOString() : undefined } : a));
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast.success('QR Code scanned! Attendance marked for Arjun Reddy');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <PageHeader title="Attendance Management" description="Track and manage event attendance">
        <Button variant="outline" onClick={() => toast.success('Attendance data exported!')}><Download className="h-4 w-4 mr-2" />Export</Button>
      </PageHeader>

      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList className="glass-card">
          <TabsTrigger value="scanner"><ScanLine className="h-4 w-4 mr-2" />QR Scanner</TabsTrigger>
          <TabsTrigger value="manual"><UserCheck className="h-4 w-4 mr-2" />Manual</TabsTrigger>
          <TabsTrigger value="stats"><BarChart3 className="h-4 w-4 mr-2" />Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-8 text-center max-w-md mx-auto">
            <div className={`relative w-48 h-48 mx-auto mb-6 rounded-2xl border-2 border-dashed ${scanning ? 'border-primary animate-pulse-glow' : 'border-border'} flex items-center justify-center`}>
              {scanning ? (
                <div className="space-y-2">
                  <div className="w-32 h-1 bg-primary/50 rounded animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)', backgroundSize: '200% 100%' }} />
                  <p className="text-xs text-primary animate-pulse">Scanning...</p>
                </div>
              ) : (
                <ScanLine className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
            <Button onClick={simulateScan} disabled={scanning} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              {scanning ? 'Scanning...' : 'Simulate QR Scan'}
            </Button>
            <p className="text-xs text-muted-foreground mt-3">Point camera at participant's QR code</p>
          </motion.div>
        </TabsContent>

        <TabsContent value="manual">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">Present</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead className="hidden md:table-cell">Event</TableHead>
                  <TableHead className="hidden sm:table-cell">Check-in Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map(a => (
                  <TableRow key={a.id}>
                    <TableCell><Checkbox checked={a.present} onCheckedChange={() => togglePresent(a.id)} /></TableCell>
                    <TableCell className="font-medium text-sm">{a.participantName}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{a.eventTitle}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {a.checkInTime ? new Date(a.checkInTime).toLocaleTimeString() : '—'}
                    </TableCell>
                    <TableCell><StatusBadge status={a.present ? 'approved' : 'pending'} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
              <h3 className="font-semibold mb-4">Attendance by Event</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={analyticsData.attendanceByEvent}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="event" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
              <h3 className="font-semibold mb-4">Overall Attendance</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
