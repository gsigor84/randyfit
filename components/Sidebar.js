// components/Sidebar.js

// components/Sidebar.js
import Link from 'next/link';
import './sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Clients</h3>
      <ul>
        <li><Link href="/">All Clients</Link></li>
        <li><Link href="#">Connected</Link></li>
        <li><Link href="#">Pending</Link></li>
        <li><Link href="#">Offline</Link></li>
      </ul>
    </div>
  );
}
