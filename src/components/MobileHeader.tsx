import { Menu, Bell } from 'lucide-react';
import { Badge } from './ui/badge';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 shadow-sm">
      <div className="h-full flex items-center justify-between px-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>

        <h1 className="text-orange-600">Student Portal</h1>

        <button className="p-2 hover:bg-slate-100 rounded-lg transition-all hover:scale-105 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" aria-label="View notifications">
          <Bell className="w-6 h-6 text-slate-700" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-white text-xs animate-pulse">
            3
          </Badge>
        </button>
      </div>
    </header>
  );
}