import Sidebar from '../../../components/Sidebar';

export default function ClientLayout({ children }) {
  return (
    <div className="flex h-screen"> {/* Full height container with flex layout */}
      <Sidebar className="hidden lg:block w-1/4 h-full bg-gray-800 text-white" /> {/* Sidebar hidden on mobile, visible on larger screens */}

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 lg:bg-gray-100"> {/* Main content area with responsive padding and background */}
        {children}
      </div>
    </div>
  );
}
