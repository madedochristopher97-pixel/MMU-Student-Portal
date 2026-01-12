import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Zap, Download, Upload, FileText, MessageSquare, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface QuickActionsCardProps {
  onNavigate?: (page: string) => void;
}

export function QuickActionsCard({ onNavigate }: QuickActionsCardProps) {
  const quickActions = [
    { icon: Download, label: 'Download Transcript', color: 'text-orange-600 hover:bg-orange-50', action: () => {} },
    { icon: Upload, label: 'Submit Assignment', color: 'text-green-600 hover:bg-green-50', action: 'submit' },
    { icon: FileText, label: 'View Statement', color: 'text-purple-600 hover:bg-purple-50', action: () => onNavigate?.('fee-statement') },
    { icon: MessageSquare, label: 'Contact Support', color: 'text-amber-600 hover:bg-amber-50', action: () => onNavigate?.('support') },
    { icon: Settings, label: 'Account Settings', color: 'text-slate-600 hover:bg-slate-50', action: () => onNavigate?.('reset-password') },
  ];

  const [showSubmit, setShowSubmit] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState('');
  const [lecturerId, setLecturerId] = useState<string>('');

  const lecturers = [
    { id: '1', name: 'Dr. Silas Kamau' },
    { id: '2', name: 'Prof. Jane Mutua' },
    { id: '3', name: 'Mr. Kevin Omollo' },
  ];

  const lecturerEmail = (name: string) => {
    return name.toLowerCase().replace(/[^a-z\s]/g, '').trim().replace(/\s+/g, '.') + '@mmu.ac.ke';
  };

  const handleSubmitAssignment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error('Please choose a file to submit');
      return;
    }
    if (!lecturerId) {
      toast.error('Please select a lecturer');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const data = reader.result as string;
        const selected = lecturers.find(l => l.id === lecturerId);
        const entry = { id: Date.now(), title: title || file.name, fileName: file.name, data, submittedAt: new Date().toISOString(), lecturer: selected?.name || '', lecturerEmail: selected ? lecturerEmail(selected.name) : '' };
        const existing = JSON.parse(localStorage.getItem('mmu_assignments') || '[]');
        existing.push(entry);
        localStorage.setItem('mmu_assignments', JSON.stringify(existing));
        toast.success('Assignment submitted (saved locally)');
        setShowSubmit(false);
        setTitle('');
        setLecturerId('');
      } catch (err) {
        toast.error('Failed to save assignment');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-700" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequent tasks</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const onClick = typeof action.action === 'string' && action.action === 'submit' ? () => setShowSubmit(true) : action.action as any;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={onClick}
                  className={`justify-start h-auto py-3 ${action.color} transition-colors`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmitAssignment(); }} className="space-y-4">
            <Input placeholder="Assignment title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Select Lecturer</label>
              <select className="w-full rounded-md border p-2" value={lecturerId} onChange={(e) => setLecturerId(e.target.value)}>
                <option value="">Choose lecturer...</option>
                {lecturers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              {lecturerId && (
                <div className="text-sm text-slate-600">Routing to: <strong>{lecturerEmail(lecturers.find(l => l.id === lecturerId)!.name)}</strong></div>
              )}
            </div>

            <div>
              <input ref={fileRef} type="file" accept="*" />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-orange-600 text-white btn-comfort">Submit</Button>
              <Button variant="ghost" onClick={() => setShowSubmit(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}