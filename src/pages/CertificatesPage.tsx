import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/SharedComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CertificateCategory } from '@/types';
import { toast } from 'sonner';

const templates = [
  { id: 't1', name: 'Classic Gold', border: 'border-warning', bg: 'from-warning/10 to-warning/5', accent: 'text-warning' },
  { id: 't2', name: 'Modern Blue', border: 'border-info', bg: 'from-info/10 to-info/5', accent: 'text-info' },
  { id: 't3', name: 'Royal Purple', border: 'border-primary', bg: 'from-primary/10 to-primary/5', accent: 'text-primary' },
];

export default function CertificatesPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CertificateCategory>('participation');
  const [template, setTemplate] = useState('t1');
  const [eventName, setEventName] = useState('Hackathon 2026');

  const selectedTemplate = templates.find(t => t.id === template)!;

  const categoryLabel = { participation: 'Certificate of Participation', winner: 'Winner Certificate', runner_up: 'Runner-up Certificate' };

  return (
    <DashboardLayout>
      <PageHeader title="Certificate Generator" description="Generate and preview certificates" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-xl p-6 space-y-5">
          <div>
            <Label>Participant Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter participant name" className="mt-1.5" />
          </div>
          <div>
            <Label>Event Name</Label>
            <Input value={eventName} onChange={e => setEventName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Category</Label>
            <div className="flex gap-2 mt-1.5">
              {(['participation', 'winner', 'runner_up'] as CertificateCategory[]).map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium capitalize transition-all ${category === c ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>
                  {c.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Template</Label>
            <div className="grid grid-cols-3 gap-3 mt-1.5">
              {templates.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${template === t.id ? t.border + ' bg-gradient-to-br ' + t.bg : 'border-border'}`}>
                  <Award className={`h-6 w-6 mx-auto ${t.accent}`} />
                  <p className="text-xs mt-1 font-medium">{t.name}</p>
                </button>
              ))}
            </div>
          </div>
          <Button onClick={() => toast.success('Certificate downloaded!')} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />Download Certificate
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className={`rounded-2xl border-4 ${selectedTemplate.border} bg-gradient-to-br ${selectedTemplate.bg} p-8 md:p-12 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <Award className={`h-12 w-12 mx-auto ${selectedTemplate.accent} mb-4`} />
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">FestFlow 2026</p>
              <h2 className="text-xl md:text-2xl font-bold mb-1">{categoryLabel[category]}</h2>
              <p className="text-sm text-muted-foreground mb-6">This is to certify that</p>
              <p className={`text-2xl md:text-3xl font-bold ${selectedTemplate.accent} mb-2`}>
                {name || 'Participant Name'}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                has {category === 'winner' ? 'won' : category === 'runner_up' ? 'been runner-up in' : 'participated in'}
              </p>
              <p className="text-lg font-semibold mb-8">{eventName}</p>
              <div className="flex justify-between items-end mt-8 pt-4 border-t border-border/30">
                <div className="text-left">
                  <div className="w-24 border-b border-foreground/30 mb-1" />
                  <p className="text-xs text-muted-foreground">Coordinator</p>
                </div>
                <p className="text-xs text-muted-foreground">April 2026</p>
                <div className="text-right">
                  <div className="w-24 border-b border-foreground/30 mb-1" />
                  <p className="text-xs text-muted-foreground">Director</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
