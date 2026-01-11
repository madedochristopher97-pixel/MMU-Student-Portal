import { ActivityStream } from '../ActivityStream';
import { AcademicPerformanceCard } from '../AcademicPerformanceCard';
import { FeePaymentCard } from '../FeePaymentCard';
import { CalendarWidget } from '../CalendarWidget';
import { AnnouncementsCard } from '../AnnouncementsCard';
import { QuickActionsCard } from '../QuickActionsCard';
import { ProfileCard } from '../ProfileCard';
import { GraduationCap } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <>
      {/* Profile & Welcome Section - Horizontal Profile Card */}
      <div className="mb-8">
        <ProfileCard />
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
            <AcademicPerformanceCard onNavigate={onNavigate} />
            <FeePaymentCard onNavigate={onNavigate} />
          </div>

          {/* Activity Stream */}
          <ActivityStream />
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calendar Widget */}
          <CalendarWidget />

          {/* Quick Actions */}
          <QuickActionsCard />
        </div>
      </div>
    </>
  );
}