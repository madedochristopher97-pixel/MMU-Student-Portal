import { ActivityStream } from '../ActivityStream';
import { AcademicPerformanceCard } from '../AcademicPerformanceCard';
import { FeePaymentCard } from '../FeePaymentCard';
import { CalendarWidget } from '../CalendarWidget';
import { AnnouncementsCard } from '../AnnouncementsCard';
import { QuickActionsCard } from '../QuickActionsCard';
import { ProfileCard } from '../ProfileCard';
import { GraduationCap } from 'lucide-react';

export function DashboardPage() {
  return (
    <>
      {/* Enhanced Welcome Section */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-r from-orange-100 via-amber-100 to-orange-50 border border-orange-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex w-14 h-14 rounded-full bg-orange-600 items-center justify-center shadow-md">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-slate-900 mb-1">Welcome back, Christopher! 👋</h1>
              <p className="text-slate-700">Here's what's happening with your academic journey today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Announcements - Full Width */}
      <div className="mb-6">
        <AnnouncementsCard />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AcademicPerformanceCard />
            <FeePaymentCard />
          </div>

          {/* Activity Stream */}
          <ActivityStream />

          {/* Profile Card - Mobile Only */}
          <div className="lg:hidden">
            <ProfileCard />
          </div>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calendar Widget */}
          <CalendarWidget />

          {/* Quick Actions */}
          <QuickActionsCard />

          {/* Profile Card - Desktop Only */}
          <div className="hidden lg:block">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  );
}