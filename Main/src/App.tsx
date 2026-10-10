import { AppProvider, useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import HomePage from '@/pages/HomePage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import DashboardPage from '@/pages/DashboardPage';
import InstructorStudioPage from '@/pages/InstructorStudioPage';
import CartPage from '@/pages/CartPage';

function PageRouter() {
  const { page } = useApp();

  switch (page.name) {
    case 'home':
      return <HomePage />;
    case 'course-detail':
      return <CourseDetailPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'instructor-studio':
      return <InstructorStudioPage />;
    case 'cart':
      return <CartPage />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageRouter />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
