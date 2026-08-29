import { Link, Outlet, useLocation } from 'react-router';
import { Sparkles, FileText, Briefcase, Settings, LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resumes', path: '/dashboard/builder', icon: FileText },
    { name: 'Job Tracker', path: '/dashboard/tracker', icon: Briefcase },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-10 md:px-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">ResumePro AI</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon className="h-5 w-5 opacity-70" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto mb-4 p-4 bg-indigo-600 rounded-xl text-white">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Premium Plan</p>
        <p className="text-sm font-bold mb-3">Unlimited AI Credits</p>
        <div className="w-full bg-indigo-400 rounded-full h-1.5">
          <div className="bg-white h-1.5 rounded-full w-3/4"></div>
        </div>
      </div>

      <div className="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-start gap-3 px-2 h-auto py-2 hover:bg-slate-50 border-0 bg-transparent rounded-lg text-left cursor-pointer transition-colors outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-slate-800">John Doe</span>
                <span className="text-xs text-slate-500">Premium Plan</span>
              </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link to="/dashboard/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col p-6">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 md:h-16 border-b border-slate-200 flex md:hidden items-center justify-between px-4 bg-white shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center shrink-0">
              <div className="w-3 h-3 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="font-bold text-slate-800">ResumePro</span>
          </Link>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 flex flex-col p-6">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 overflow-auto bg-[#F8FAFC]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
