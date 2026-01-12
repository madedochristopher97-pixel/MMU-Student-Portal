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

  const handleSubmitAssignment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error('Please choose a file to submit');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const data = reader.result as string;
        const entry = { id: Date.now(), title: title || file.name, fileName: file.name, data, submittedAt: new Date().toISOString() };
        const existing = JSON.parse(localStorage.getItem('mmu_assignments') || '[]');
        existing.push(entry);
        localStorage.setItem('mmu_assignments', JSON.stringify(existing));
        toast.success('Assignment submitted (saved locally)');
        setShowSubmit(false);
        setTitle('');
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
            <input ref={fileRef} type="file" accept="*" />
            <DialogFooter>
              <Button type="submit" className="bg-orange-600 text-white">Submit</Button>
              <Button variant="ghost" onClick={() => setShowSubmit(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}