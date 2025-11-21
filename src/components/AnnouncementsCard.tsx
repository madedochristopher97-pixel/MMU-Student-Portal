import { Card, CardContent } from './ui/card';
import { Megaphone, X, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function AnnouncementsCard() {
  const criticalAnnouncements = [
    {
      id: 1,
      title: 'Exam Schedule Published',
      message: 'Final examination timetable for Semester 2, 2025 is now available. Check your student portal for details.',
      priority: 'high',
      date: 'Today'
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      message: 'Main library will be open 24/7 during examination period starting October 24th.',
      priority: 'medium',
      date: 'Yesterday'
    }
  ];

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center shrink-0 shadow-md">
            <Megaphone className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-orange-900">Critical Announcements</h3>
              <Badge variant="destructive" className="h-5 bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                {criticalAnnouncements.length} New
              </Badge>
            </div>

            <div className="space-y-2.5">
              {criticalAnnouncements.map((announcement) => (
                <Alert 
                  key={announcement.id}
                  className="bg-white border-slate-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer p-3.5"
                >
                  <AlertDescription className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="text-slate-900">{announcement.title}</h4>
                        <Badge 
                          variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                          className={
                            announcement.priority === 'high' 
                              ? 'h-4 text-xs bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200' 
                              : 'h-4 text-xs bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200'
                          }
                        >
                          {announcement.priority === 'high' ? 'Urgent' : 'Info'}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{announcement.message}</p>
                      <p className="text-xs text-slate-500 mt-1.5">{announcement.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-1 group-hover:text-orange-600 transition-colors" />
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0 h-auto mt-3 transition-colors">
              View all announcements →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}