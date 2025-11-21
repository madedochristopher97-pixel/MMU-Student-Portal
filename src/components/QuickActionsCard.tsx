import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Zap, Download, Upload, FileText, MessageSquare, Settings } from 'lucide-react';
import { Button } from './ui/button';

export function QuickActionsCard() {
  const quickActions = [
    { icon: Download, label: 'Download Transcript', color: 'text-orange-600 hover:bg-orange-50' },
    { icon: Upload, label: 'Submit Assignment', color: 'text-green-600 hover:bg-green-50' },
    { icon: FileText, label: 'View Statement', color: 'text-purple-600 hover:bg-purple-50' },
    { icon: MessageSquare, label: 'Contact Support', color: 'text-amber-600 hover:bg-amber-50' },
    { icon: Settings, label: 'Account Settings', color: 'text-slate-600 hover:bg-slate-50' },
  ];

  return (
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
            return (
              <Button
                key={index}
                variant="ghost"
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
  );
}