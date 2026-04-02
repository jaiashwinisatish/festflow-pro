import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockNotifications } from '@/data/mockData';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="h-14 border-b border-border/50 glass-card flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="mr-2" />
        <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="border-0 bg-transparent h-7 w-48 focus-visible:ring-0 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                {unread}
              </span>
            )}
          </Button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-lg border border-border/50 shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-border/50 font-semibold text-sm">Notifications</div>
              {mockNotifications.map(n => (
                <div key={n.id} className={`p-3 border-b border-border/30 text-sm ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{n.title}</span>
                    {!n.read && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {user && (
          <div className="flex items-center gap-3 ml-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-bold">
              {user.name[0]}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-xs">
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
