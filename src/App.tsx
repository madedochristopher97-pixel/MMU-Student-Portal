import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { DashboardPage } from './components/pages/DashboardPage';
import { FeeStatementPage } from './components/pages/FeeStatementPage';
import { ReceiptsPage } from './components/pages/ReceiptsPage';
import { FeeStructurePage } from './components/pages/FeeStructurePage';
import { ProvisionalResultsPage } from './components/pages/ProvisionalResultsPage';
import { ClearanceRequisitionPage } from './components/pages/ClearanceRequisitionPage';
import { CourseRegistrationPage } from './components/pages/CourseRegistrationPage';
import { LecturersEvaluationPage } from './components/pages/LecturersEvaluationPage';
import { AccommodationPage } from './components/pages/AccommodationPage';
import { DocumentsPage } from './components/pages/DocumentsPage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'fee-statement':
        return <FeeStatementPage />;
      case 'receipts':
        return <ReceiptsPage />;
      case 'fee-structure':
        return <FeeStructurePage />;
      case 'course-registration':
        return <CourseRegistrationPage />;
      case 'provisional-results':
        return <ProvisionalResultsPage />;
      case 'lecturers-evaluation':
        return <LecturersEvaluationPage />;
      case 'accommodation':
        return <AccommodationPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'clearance':
        return <ClearanceRequisitionPage />;
      case 'reset-password':
        return <ResetPasswordPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto p-4 lg:p-8 w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}