import Sidebar from '../../../components/Sidebar';
import './clientLayout.css'; // Import the CSS file

export default function ClientLayout({ children }) {
  return (
    <div className="layoutContainer"> {/* Full height container */}
      <Sidebar /> {/* Sidebar fixed on the left */}
      <div className="mainContent"> {/* Main content takes full width on desktop */}
        {children}
      </div>
    </div>
  );
}
