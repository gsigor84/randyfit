"use client";
import { usePathname } from 'next/navigation';
import Sidebar from 'components/Sidebar';
import ClientList from 'components/ClientList';


export default function ClientPage() {
  const pathname = usePathname();
  const clientId = pathname.split('/').pop();

  return (
    <div className="client-page">
      <Sidebar />
      <div className="client-content">
        <div className="main-content">
          <ClientList clientId={clientId} />
        </div>
      </div>
    </div>
  );
}