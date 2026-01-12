import { Bell, Search, Menu, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { useAuthStore } from '../store/authStore';
import { useRef, useState, useEffect } from 'react';

interface TopNavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopNavbar({ onMenuClick, title = "Dashboard" }: TopNavbarProps) {
  const auth = useAuthStore();
  const { user } = auth;
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const userName = user?.name || (() => {
    try {
      const raw = localStorage.getItem('mmu_profile');
      if (raw) return JSON.parse(raw).name || 'Christopher Madido';
    } catch (e) {}
    return 'Christopher Madido';
  })();

  const userInitials = userName.split(' ').map(n => n[0]).join('');

  useEffect(() => {
    // try to load avatar from auth store or localStorage
    if (user?.avatar_url) setAvatarSrc(user.avatar_url as string);
    else {
      try {
        const raw = localStorage.getItem('mmu_profile');
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.image) setAvatarSrc(saved.image as string);
        }
      } catch (e) {}
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result as string;
      setAvatarSrc(data);
      try {
        const raw = localStorage.getItem('mmu_profile');
        const obj = raw ? JSON.parse(raw) : {};
        obj.image = data;
        localStorage.setItem('mmu_profile', JSON.stringify(obj));
      } catch (e) {}
      // update auth store
      try {
        const existing = auth.user || { id: 'local', email: '', name: userName, studentId: '' };
        auth.setUser({ ...existing, avatar_url: data });
      } catch (e) {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sticky top-4 z-40 mx-4 lg:mx-8 mb-6">
      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Left: Menu & Title */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5 text-slate-600" />
          </Button>
          <h1 className="text-lg font-semibold text-slate-800 hidden md:block">{title}</h1>
          <div className="md:hidden">
            <img src="/mmu-logo.png" alt="MMU" className="h-6 object-contain" />
          </div>
        </div>

        {/* Center: Search (Optional, visually nice) */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search units, fees, results..." 
              className="pl-10 rounded-full bg-slate-100 border-none focus-visible:ring-offset-0 focus-visible:ring-orange-500/20" 
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-orange-600 hover:bg-orange-50">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
             <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900 leading-none">{userName}</p>
                <p className="text-xs text-slate-500 mt-1">Student</p>
             </div>
            <div className="relative">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Avatar onClick={handleAvatarClick} title="Edit image" className="w-9 h-9 border-2 border-white ring-2 ring-orange-100 cursor-pointer transition-transform hover:scale-105">
                <AvatarImage src={avatarSrc || ''} />
                <AvatarFallback className="bg-orange-600 text-white text-xs">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <button onClick={handleAvatarClick} title="Quick edit image" className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md border border-slate-100">
                <Camera className="w-3 h-3 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
