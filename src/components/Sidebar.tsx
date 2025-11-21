import { X, LayoutDashboard, Wallet, GraduationCap, Home, FileText, ClipboardCheck, Lock, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';
import { useState } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', subItems: [] },
  { 
    id: 'financials', 
    icon: Wallet, 
    label: 'Financials',
    subItems: [
      { id: 'fee-statement', label: 'Fee Statement' },
      { id: 'receipts', label: 'Receipts' },
      { id: 'fee-structure', label: 'Fee Structure' },
    ]
  },
  { 
    id: 'academics', 
    icon: GraduationCap, 
    label: 'Academics',
    subItems: [
      { id: 'course-registration', label: 'Course Registration' },
      { id: 'provisional-results', label: 'Exam Results' },
      { id: 'lecturers-evaluation', label: 'Rate My Lecturers' },
    ]
  },
  { id: 'accommodation', icon: Home, label: 'Accommodation', subItems: [] },
  { id: 'documents', icon: FileText, label: 'Documents', subItems: [] },
  { id: 'clearance', icon: ClipboardCheck, label: 'Clearance Form', subItems: [] },
];

const secondaryItems = [
  { icon: Lock, label: 'Reset Password', active: false },
  { icon: LogOut, label: 'Sign Out', active: false },
];

export function Sidebar({ open, onClose, currentPage, onNavigate }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['financials', 'academics']);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      const { logout } = require('../store/authStore').useAuthStore.getState();
      logout();
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out",
          "w-64 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <h2 className="text-orange-600">Student Portal</h2>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {/* Parent Item */}
                <button
                  onClick={() => {
                    if (item.subItems.length > 0) {
                      toggleExpanded(item.id);
                    } else {
                      handleNavigate(item.id);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white",
                    currentPage === item.id
                      ? "bg-orange-50 text-orange-600 shadow-sm"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5.5 h-5.5 stroke-[2.5]" strokeWidth={2.5} />
                    <span>{item.label}</span>
                  </div>
                  {item.subItems.length > 0 && (
                    expandedItems.includes(item.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  )}
                </button>

                {/* Sub Items */}
                {item.subItems.length > 0 && expandedItems.includes(item.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavigate(subItem.id)}
                        className={cn(
                          "w-full flex items-center px-4 py-2 rounded-lg transition-all text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white",
                          currentPage === subItem.id
                            ? "bg-orange-50 text-orange-600 shadow-sm"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-200" />

          {/* Secondary Items */}
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === 'Sign Out') {
                    handleLogout();
                  } else if (item.label === 'Reset Password') {
                    handleNavigate('reset-password');
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                <item.icon className="w-5.5 h-5.5 stroke-[2.5]" strokeWidth={2.5} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            © 2025 Multimedia University
          </p>
        </div>
      </aside>
    </>
  );
}