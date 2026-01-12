import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { User, Mail, Phone, Camera, Save, X, Edit2, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';

export function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for student info
  const auth = useAuthStore();

  const [info, setInfo] = useState({
    name: 'Christopher Madido',
    admissionNo: 'SST-251-1**/2024',
    status: 'Active',
    faculty: 'Faculty of Social Sciences and Technology',
    year: 'Year 2, Semester 1',
    email: 'christopher.made@student.mmu.ac.ke',
    phone: '0792 123 456',
    image: null as string | null
  });

  const [editForm, setEditForm] = useState(info);

  const handleSave = () => {
    setInfo(editForm);
    // persist to localStorage
    try {
      localStorage.setItem('mmu_profile', JSON.stringify(editForm));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }

    // update auth store (name + avatar)
    try {
      const existing = auth.user || { id: 'local', email: editForm.email, name: editForm.name, studentId: editForm.admissionNo };
      auth.setUser({ ...existing, name: editForm.name, avatar_url: editForm.image });
    } catch (e) {}

    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditForm(info);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // load saved profile from localStorage if present
    try {
      const raw = localStorage.getItem('mmu_profile');
      if (raw) {
        const saved = JSON.parse(raw);
        setInfo((prev) => ({ ...prev, ...saved }));
        setEditForm((prev) => ({ ...prev, ...saved }));
        // also update auth store
        if (saved.name || saved.image) {
          const existing = auth.user || { id: 'local', email: saved.email || prev.email, name: saved.name || prev.name, studentId: saved.admissionNo || prev.admissionNo };
          auth.setUser({ ...existing, name: saved.name || existing.name, avatar_url: saved.image || existing.avatar_url });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <Card className="bg-white border-slate-200 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">

          {/* Left: Avatar & Main Status */}
          <div className="p-6 md:w-1/3 lg:w-1/4 bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-orange-100">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg mb-4">
                <AvatarImage src={isEditing ? editForm.image || "" : info.image || ""} objectFit='cover' />
                <AvatarFallback className="bg-orange-600 text-white text-3xl font-light">
                  {(isEditing ? editForm.name : info.name).split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 shadow-lg transition-all"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="text-center w-full px-4 mt-2">
              {isEditing ? (
                <>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-center font-bold text-lg mb-2 h-9 bg-white"
                  />
                  <Input
                    value={editForm.admissionNo}
                    onChange={(e) => setEditForm({ ...editForm, admissionNo: e.target.value })}
                    className="text-center text-sm mb-2 h-9 bg-white"
                  />
                  <Input
                    value={editForm.faculty}
                    onChange={(e) => setEditForm({ ...editForm, faculty: e.target.value })}
                    className="text-center text-sm mb-2 h-9 bg-white"
                  />
                  <Input
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    className="text-center text-sm mb-2 h-9 bg-white"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-1 bg-white rounded-lg py-2 px-4 inline-block">{info.name}</h2>
                  <p className="text-sm text-slate-500 font-mono mb-2 bg-white rounded-lg py-2 px-4 inline-block mt-2">{info.admissionNo}</p>
                  <p className="text-sm text-slate-700 mb-1 mt-2">{info.faculty}</p>
                  <p className="text-sm text-slate-500 mb-2">{info.year}</p>
                </>
              )}
              <Badge variant={info.status === 'Active' ? 'default' : 'secondary'} className={`${info.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-700'}`}>
                <span className={`w-2 h-2 rounded-full mr-1.5 ${info.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                {info.status}
              </Badge>
            </div>
          </div>

          {/* Right: Details & Editing */}
          <div className="p-6 md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Personal Details
              </h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancel} className="text-slate-500">
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Save className="w-4 h-4 mr-1" /> Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Phone Number</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    {isEditing ? (
                      <Input
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="bg-slate-50/50"
                      />
                    ) : (
                      <span className="text-slate-700 font-medium">{info.phone}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email Updates</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    {isEditing ? (
                      <Input
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-slate-50/50"
                      />
                    ) : (
                      <span className="text-slate-700 font-medium">{info.email}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="pt-2">
                  {!isEditing && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-slate-600">Profile verified and active for checking academic results.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}