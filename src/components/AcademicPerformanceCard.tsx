import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function AcademicPerformanceCard() {
  const upcomingDeadlines = [
    { course: 'Software Engineering', assignment: 'Project Phase 2', date: '2025-10-25', daysLeft: 5 },
    { course: 'Database Systems', assignment: 'Final Exam', date: '2025-10-28', daysLeft: 8 },
    { course: 'Web Development', assignment: 'Portfolio Submission', date: '2025-11-01', daysLeft: 12 },
  ];

  return (
    <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <GraduationCap className="w-5 h-5" />
              Academic Performance
            </CardTitle>
            <CardDescription>Current semester overview</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-orange-600 hover:bg-orange-50 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current GPA */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-700">Current GPA</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-orange-700">3.67</span>
            <span className="text-sm text-slate-600">/ 4.00</span>
          </div>
          <Progress value={91.75} className="mt-3 h-2" />
          <p className="text-xs text-slate-600 mt-2">92nd percentile in your cohort</p>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-slate-700" />
            <h4 className="text-slate-900">Upcoming Deadlines</h4>
          </div>
          <div className="space-y-2">
            {upcomingDeadlines.map((deadline, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all cursor-pointer hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">{deadline.assignment}</p>
                  <p className="text-xs text-slate-600">{deadline.course}</p>
                </div>
                <Badge 
                  variant={deadline.daysLeft <= 5 ? "destructive" : "secondary"}
                  className={`ml-2 shrink-0 ${deadline.daysLeft <= 5 ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100' : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
                >
                  {deadline.daysLeft}d
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            View Grades
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Course Materials
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}