import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader, StatusBadge } from '@/components/dashboard/SharedComponents';
import { mockRegistrations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Registration } from '@/types';
import { toast } from 'sonner';

export default function ScrutinyPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [remarks, setRemarks] = useState('');

  const filtered = registrations.filter(r => {
    const matchSearch = r.participantName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status, remarks } : r));
    toast.success(`Registration ${status}`);
    setSelectedReg(null);
    setRemarks('');
  };

  return (
    <DashboardLayout>
      <PageHeader title="Scrutiny Panel" description="Verify documents and approve registrations" />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search participant..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_scrutiny">Under Scrutiny</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead className="hidden md:table-cell">Event</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Payment</TableHead>
              <TableHead className="hidden md:table-cell">Docs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.id}>
                <TableCell>
                  <p className="font-medium text-sm">{r.participantName}</p>
                  <p className="text-xs text-muted-foreground">{r.email}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">{r.eventTitle}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="hidden sm:table-cell"><StatusBadge status={r.paymentStatus} /></TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex gap-1">
                    {r.documentUrl && <FileText className="h-4 w-4 text-info" />}
                    {r.paymentProofUrl && <CreditCard className="h-4 w-4 text-success" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => { setSelectedReg(r); setRemarks(r.remarks || ''); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader><DialogTitle>Registration Details</DialogTitle></DialogHeader>
          {selectedReg && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{selectedReg.participantName}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedReg.email}</span></div>
                <div><span className="text-muted-foreground">Event:</span> <span className="font-medium">{selectedReg.eventTitle}</span></div>
                <div><span className="text-muted-foreground">Type:</span> <span className="font-medium capitalize">{selectedReg.type}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> <span className="font-medium">₹{selectedReg.amount}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedReg.status} /></div>
              </div>

              {selectedReg.teamMembers && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Team Members:</p>
                  <div className="flex flex-wrap gap-1">{selectedReg.teamMembers.map((m, i) => <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">{m}</span>)}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-center">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">{selectedReg.documentUrl ? 'Document uploaded' : 'No document'}</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-center">
                  <CreditCard className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">{selectedReg.paymentProofUrl ? 'Payment proof uploaded' : 'No payment proof'}</p>
                </div>
              </div>

              <div>
                <Label>Remarks</Label>
                <Textarea value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Add remarks..." className="mt-1" />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="destructive" onClick={() => selectedReg && handleAction(selectedReg.id, 'rejected')}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
            <Button onClick={() => selectedReg && handleAction(selectedReg.id, 'approved')} className="bg-success text-success-foreground"><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
