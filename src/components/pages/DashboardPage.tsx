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

      {/* Primary: Fee Payment / Financial Summary (top priority) */}
      <div className="mb-6">
        <FeePaymentCard onNavigate={onNavigate} />
      </div>

      {/* Academic Performance (with shortcuts) */}
      <div className="mb-6">
        <AcademicPerformanceCard onNavigate={onNavigate} />
      </div>

      {/* Critical Announcements */}
      <div className="mb-6">
        <AnnouncementsCard />
      </div>

      {/* Main Dashboard Grid (activity and calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <ActivityStream />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <CalendarWidget />
          <QuickActionsCard onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
}