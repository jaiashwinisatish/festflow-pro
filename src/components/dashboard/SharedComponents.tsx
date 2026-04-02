import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover rounded-xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendUp ? 'text-success' : 'text-destructive'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${gradient || 'bg-gradient-to-br from-primary/20 to-accent/20'}`}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h1>
          {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    pending: 'bg-warning/10 text-warning border border-warning/20',
    under_scrutiny: 'bg-info/10 text-info border border-info/20',
    approved: 'bg-success/10 text-success border border-success/20',
    rejected: 'bg-destructive/10 text-destructive border border-destructive/20',
    paid: 'bg-success/10 text-success border border-success/20',
    failed: 'bg-destructive/10 text-destructive border border-destructive/20',
    active: 'bg-success/10 text-success border border-success/20',
    checked_in: 'bg-info/10 text-info border border-info/20',
    expired: 'bg-muted text-muted-foreground border border-border',
  };

  const label = status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config[status] || 'bg-muted text-muted-foreground'}`}>
      {label}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1 max-w-sm">{description}</p>
    </div>
  );
}
