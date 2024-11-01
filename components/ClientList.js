// components/ClientList.js

"use client";

import Link from 'next/link';
import { useState } from 'react';
import './clientlist.css';

export default function ClientList() {
  const [category, setCategory] = useState('All');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const clients = [
    { id: 'ben-andrew', name: 'Ben Andrew - Demo', activity: '50%', status: 'Online' },
    { id: 'kristina-wilson', name: 'Kristina Wilson - Demo', activity: '0%', status: 'In-Person' }
  ];

  return (
    <div className="mainContent">
      <header className="header">
        <h2>All Clients ({clients.length})</h2>
        <button className="upgradeBtn">Upgrade</button>
      </header>

      <div className="filters">
        <select value={category} onChange={handleCategoryChange}>
          <option value="All">Category: All</option>
          <option value="Online">Online</option>
          <option value="In-Person">In-Person</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Activity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <Link href={`/client/${client.id}`}> {/* Dynamic link for each client */}
                  {client.name}
                </Link>
              </td>
              <td>{client.activity}</td>
              <td>{client.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
