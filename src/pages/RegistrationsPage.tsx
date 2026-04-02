import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, XCircle, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader, StatusBadge } from '@/components/dashboard/SharedComponents';
import { mockRegistrations, mockEvents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Registration, RegistrationStatus } from '@/types';
import { toast } from 'sonner';

export default function RegistrationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [showRegForm, setShowRegForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', event: '', type: 'individual' as 'individual' | 'team', teamName: '', teamMembers: '' });

  const filtered = registrations.filter(r => {
    const matchSearch = r.participantName.toLowerCase().includes(search.toLowerCase()) || r.eventTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const selectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(r => r.id));

  const bulkAction = (status: RegistrationStatus) => {
    setRegistrations(prev => prev.map(r => selected.includes(r.id) ? { ...r, status } : r));
    toast.success(`${selected.length} registrations ${status}`);
    setSelected([]);
  };

  const handleRegister = () => {
    const event = mockEvents.find(e => e.id === formData.event);
    const newReg: Registration = {
      id: `r-${Date.now()}`, participantName: formData.name, email: formData.email, phone: formData.phone,
      eventId: formData.event, eventTitle: event?.title || '', type: formData.type,
      teamName: formData.type === 'team' ? formData.teamName : undefined,
      teamMembers: formData.type === 'team' ? formData.teamMembers.split(',').map(s => s.trim()) : undefined,
      status: 'pending', paymentStatus: 'pending', amount: 300, registeredAt: new Date().toISOString(),
    };
    setRegistrations(prev => [newReg, ...prev]);
    setShowRegForm(false);
    toast.success('Registration submitted!');
  };

  return (
    <DashboardLayout>
      <PageHeader title="Registrations" description={isAdmin ? 'Manage all registrations' : 'Your event registrations'}>
        {!isAdmin && <Button onClick={() => setShowRegForm(true)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Register Now</Button>}
      </PageHeader>

      {/* Registration Tracker */}
      {!isAdmin && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-4">Registration Tracker</h3>
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {['Pending', 'Under Scrutiny', 'Approved'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</div>
                <span className="ml-2 text-xs hidden sm:inline">{step}</span>
                {i < 2 && <div className={`w-12 h-0.5 mx-2 ${i < 1 ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or event..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_scrutiny">Under Scrutiny</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {isAdmin && selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 glass-card rounded-lg">
          <span className="text-sm">{selected.length} selected</span>
          <Button size="sm" onClick={() => bulkAction('approved')} className="bg-success text-success-foreground"><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
          <Button size="sm" variant="destructive" onClick={() => bulkAction('rejected')}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
        </div>
      )}

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {isAdmin && <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={selectAll} /></TableHead>}
              <TableHead>Participant</TableHead>
              <TableHead className="hidden md:table-cell">Event</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Payment</TableHead>
              <TableHead className="hidden lg:table-cell">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.id}>
                {isAdmin && <TableCell><Checkbox checked={selected.includes(r.id)} onCheckedChange={() => toggleSelect(r.id)} /></TableCell>}
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{r.participantName}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">{r.eventTitle}</TableCell>
                <TableCell className="hidden sm:table-cell"><span className="capitalize text-sm">{r.type}</span></TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="hidden md:table-cell"><StatusBadge status={r.paymentStatus} /></TableCell>
                <TableCell className="hidden lg:table-cell text-sm">₹{r.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Registration Form Dialog */}
      <Dialog open={showRegForm} onOpenChange={setShowRegForm}>
        <DialogContent className="glass-card">
          <DialogHeader><DialogTitle>Event Registration</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Full Name</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1" /></div>
            <div><Label>Email</Label><Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="mt-1" /></div>
            <div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Event</Label>
              <Select value={formData.event} onValueChange={v => setFormData({ ...formData, event: v })}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select event" /></SelectTrigger>
                <SelectContent>{mockEvents.map(e => <SelectItem key={e.id} value={e.id}>{e.title} ({e.category})</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Registration Type</Label>
              <div className="flex gap-3 mt-1">
                {(['individual', 'team'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setFormData({ ...formData, type: t })}
                    className={`px-4 py-2 rounded-lg border text-sm capitalize ${formData.type === t ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}>{t}</button>
                ))}
              </div>
            </div>
            {formData.type === 'team' && (
              <>
                <div><Label>Team Name</Label><Input value={formData.teamName} onChange={e => setFormData({ ...formData, teamName: e.target.value })} className="mt-1" /></div>
                <div><Label>Team Members (comma separated)</Label><Textarea value={formData.teamMembers} onChange={e => setFormData({ ...formData, teamMembers: e.target.value })} className="mt-1" /></div>
              </>
            )}
          </div>
          <DialogFooter><Button onClick={handleRegister} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Submit Registration</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
