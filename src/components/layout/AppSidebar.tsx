import {
  LayoutDashboard, Users, ClipboardCheck, Award, QrCode, Calendar, ScanLine,
  Shield, Ticket, BarChart3, Zap
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navByRole = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Registrations', url: '/registrations', icon: Users },
    { title: 'Scrutiny', url: '/scrutiny', icon: Shield },
    { title: 'Events', url: '/events', icon: Calendar },
    { title: 'Attendance', url: '/attendance', icon: ClipboardCheck },
    { title: 'Passes', url: '/passes', icon: QrCode },
    { title: 'Certificates', url: '/certificates', icon: Award },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  ],
  participant: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Events', url: '/events', icon: Calendar },
    { title: 'My Registrations', url: '/registrations', icon: Ticket },
    { title: 'My Passes', url: '/passes', icon: QrCode },
    { title: 'Certificates', url: '/certificates', icon: Award },
  ],
  coordinator: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Events', url: '/events', icon: Calendar },
    { title: 'Attendance', url: '/attendance', icon: ClipboardCheck },
    { title: 'Registrations', url: '/registrations', icon: Users },
    { title: 'Scan Entry', url: '/passes', icon: ScanLine },
  ],
};

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  if (!user) return null;
  const items = navByRole[user.role];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-sm gradient-text">FestFlow</p>
                  <p className="text-[10px] text-muted-foreground">Management System</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium border border-primary/20"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
