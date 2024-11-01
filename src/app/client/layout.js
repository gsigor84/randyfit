import Sidebar from '../../../components/Sidebar';

export default function ClientLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Sidebar will remain fixed on the left */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}> {/* Main content area */}
        {children}
      </div>
    </div>
  );
}