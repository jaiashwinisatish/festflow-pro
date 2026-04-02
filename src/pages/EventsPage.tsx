import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar as CalendarIcon, MapPin, Users, Clock, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/SharedComponents';
import { mockEvents } from '@/data/mockData';
import { FestEvent, EventCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const categoryColors: Record<EventCategory, string> = {
  technical: 'bg-primary/10 text-primary border-primary/20',
  cultural: 'bg-accent/10 text-accent border-accent/20',
  sports: 'bg-success/10 text-success border-success/20',
  workshop: 'bg-warning/10 text-warning border-warning/20',
  gaming: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function EventsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)

  const filtered = events.filter(e => categoryFilter === 'all' || e.category === categoryFilter);

  const daysInMonth = new Date(2026, currentMonth + 1, 0).getDate();
  const firstDay = new Date(2026, currentMonth, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getEventsForDay = (day: number) => {
    const dateStr = `2026-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <DashboardLayout>
      <PageHeader title="Events" description="Browse and manage fest events">
        {isAdmin && <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Event</Button>}
      </PageHeader>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'technical', 'cultural', 'sports', 'workshop', 'gaming'].map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize border transition-all ${categoryFilter === c ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList className="glass-card">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          {isAdmin && <TabsTrigger value="venues">Venues</TabsTrigger>}
        </TabsList>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card-hover rounded-xl overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className={`text-xs capitalize ${categoryColors[event.category]}`}>{event.category}</Badge>
                    {isAdmin && (
                      <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-7 w-7"><Edit className="h-3 w-3" /></Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><CalendarIcon className="h-3.5 w-3.5" />{event.date}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.venue}</div>
                    <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{event.registeredCount}/{event.maxParticipants} registered</div>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground">Coordinator: {event.coordinator.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}><ChevronLeft className="h-4 w-4" /></Button>
              <h3 className="font-semibold">{monthNames[currentMonth]} 2026</h3>
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground p-2">{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                return (
                  <div key={day} className={`min-h-[60px] p-1 rounded-lg border ${dayEvents.length > 0 ? 'border-primary/30 bg-primary/5' : 'border-transparent'}`}>
                    <p className="text-xs font-medium">{day}</p>
                    {dayEvents.slice(0, 2).map(e => (
                      <div key={e.id} className={`text-[9px] px-1 py-0.5 rounded mt-0.5 truncate ${categoryColors[e.category]}`}>{e.title}</div>
                    ))}
                    {dayEvents.length > 2 && <p className="text-[9px] text-muted-foreground">+{dayEvents.length - 2} more</p>}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="timeline">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-5">
            <div className="space-y-4">
              {[...new Set(events.map(e => e.date))].sort().map(date => (
                <div key={date}>
                  <h4 className="font-semibold text-sm mb-2 text-primary">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                  <div className="ml-4 border-l-2 border-primary/20 space-y-3 pl-4">
                    {events.filter(e => e.date === date).sort((a, b) => a.time.localeCompare(b.time)).map(e => (
                      <div key={e.id} className="flex items-start gap-3 relative">
                        <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                        <div className="flex-1 p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-primary">{e.time}</span>
                            <Badge variant="outline" className={`text-[10px] ${categoryColors[e.category]}`}>{e.category}</Badge>
                          </div>
                          <p className="font-medium text-sm">{e.title}</p>
                          <p className="text-xs text-muted-foreground">{e.venue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="venues">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Venue</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Time</TableHead>
                    <TableHead>Capacity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium text-sm">{e.venue}</TableCell>
                      <TableCell className="text-sm">{e.title}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{e.date}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{e.time}</TableCell>
                      <TableCell className="text-sm">{e.maxParticipants}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>
        )}
      </Tabs>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="glass-card">
          <DialogHeader><DialogTitle>Add New Event</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input className="mt-1" placeholder="Event title" /></div>
            <div><Label>Category</Label>
              <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {['technical', 'cultural', 'sports', 'workshop', 'gaming'].map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Description</Label><Textarea className="mt-1" placeholder="Event description" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input type="date" className="mt-1" /></div>
              <div><Label>Time</Label><Input type="time" className="mt-1" /></div>
            </div>
            <div><Label>Venue</Label><Input className="mt-1" placeholder="Venue name" /></div>
            <div><Label>Max Participants</Label><Input type="number" className="mt-1" placeholder="100" /></div>
          </div>
          <DialogFooter><Button onClick={() => { setShowForm(false); toast.success('Event created!'); }} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Create Event</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
