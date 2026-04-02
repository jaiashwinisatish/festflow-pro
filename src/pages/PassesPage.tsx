import { motion } from 'framer-motion';
import { Download, Ticket } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader, StatusBadge } from '@/components/dashboard/SharedComponents';
import { mockPasses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function PassesPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Digital Passes" description="View and manage event passes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPasses.map((pass, i) => (
          <motion.div
            key={pass.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 p-6 text-center">
              <div className="bg-card rounded-xl p-4 inline-block shadow-lg">
                <QRCodeSVG value={pass.qrData} size={120} level="H"
                  bgColor="transparent" fgColor="currentColor" />
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{pass.participantName}</h3>
                <StatusBadge status={pass.status} />
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <span>{pass.eventTitle}</span>
                </div>
                <p className="text-muted-foreground text-xs">{pass.eventDate}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <Badge variant="outline" className="text-xs capitalize">{pass.passType.replace(/_/g, ' ')}</Badge>
                <Button size="sm" variant="ghost" onClick={() => toast.success('Pass downloaded!')}><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
