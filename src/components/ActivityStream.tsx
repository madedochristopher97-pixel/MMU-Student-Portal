import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Activity, Calendar, GraduationCap, Wallet, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export function ActivityStream() {
  const activities = [
    {
      id: 1,
      type: 'deadline',
      icon: Calendar,
      title: 'Assignment Due Soon',
      description: 'Software Engineering Project Phase 2',
      time: 'Due in 5 days',
      priority: 'high',
      actionable: true
    },
    {
      id: 2,
      type: 'payment',
      icon: CheckCircle,
      title: 'Fee Payment Confirmed',
      description: 'Overpayment credit of Ksh. 18,360.00',
      time: '2 days ago',
      priority: 'success',
      actionable: false
    },
    {
      id: 3,
      type: 'academic',
      icon: GraduationCap,
      title: 'New Grades Posted',
      description: 'Database Systems - Midterm Exam: A- (87%)',
      time: '3 days ago',
      priority: 'neutral',
      actionable: true
    },
    {
      id: 4,
      type: 'document',
      icon: FileText,
      title: 'Document Available',
      description: 'Semester transcripts now downloadable',
      time: '5 days ago',
      priority: 'neutral',
      actionable: true
    },
    {
      id: 5,
      type: 'deadline',
      icon: Calendar,
      title: 'Exam Schedule Released',
      description: 'Database Systems Final - Oct 28, 2025',
      time: '1 week ago',
      priority: 'medium',
      actionable: true
    },
    {
      id: 6,
      type: 'academic',
      icon: Clock,
      title: 'Class Rescheduled',
      description: 'Web Development Lab moved to Friday 2PM',
      time: '1 week ago',
      priority: 'neutral',
      actionable: false
    },
    {
      id: 7,
      type: 'payment',
      icon: Wallet,
      title: 'Scholarship Applied',
      description: 'Government scholarship of Ksh. 100,000 credited',
      time: '2 weeks ago',
      priority: 'success',
      actionable: false
    },
    {
      id: 8,
      type: 'academic',
      icon: GraduationCap,
      title: 'Course Registration Complete',
      description: '5 courses registered for this semester',
      time: '3 weeks ago',
      priority: 'success',
      actionable: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getIconColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-700" />
              Activity Stream
            </CardTitle>
            <CardDescription>Recent and upcoming events</CardDescription>
          </div>
          <Badge variant="secondary">{activities.length} items</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className={`flex gap-4 p-4 rounded-lg border ${getPriorityColor(activity.priority)} hover:shadow-sm transition-all cursor-pointer group`}
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(activity.priority)}`}>
                      <Icon className={`w-5 h-5 ${getIconColor(activity.priority)}`} />
                    </div>
                    {index < activities.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 mt-2 min-h-[20px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-slate-900 group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </h4>
                      {activity.actionable && (
                        <Badge variant="outline" className="shrink-0">
                          Action
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
