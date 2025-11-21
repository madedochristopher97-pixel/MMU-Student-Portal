import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { useState } from 'react';
import { Badge } from './ui/badge';

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Important dates with events
  const eventDates = [
    new Date(2025, 9, 25), // Oct 25
    new Date(2025, 9, 28), // Oct 28
    new Date(2025, 10, 1), // Nov 1
  ];

  const upcomingEvents = [
    { date: 'Oct 25', event: 'Project Phase 2 Due', color: 'bg-red-500' },
    { date: 'Oct 28', event: 'Database Final Exam', color: 'bg-orange-500' },
    { date: 'Nov 1', event: 'Portfolio Submission', color: 'bg-blue-500' },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-slate-700" />
          Calendar
        </CardTitle>
        <CardDescription>Upcoming events & deadlines</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-2">
          <h4 className="text-sm text-slate-600">Upcoming Events</h4>
          {upcomingEvents.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">{item.event}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
