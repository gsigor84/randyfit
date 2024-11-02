// components/Sidebar.js
"use client";

import React, { useState } from 'react';
import { FiChevronRight } from "react-icons/fi";
import './sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Minimalistic menu icon button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FiChevronRight />
      </button>

      {/* Sidebar with toggle functionality */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>Clients</h3>
        <ul>
          <li><a href="/">All Clients</a></li>
          <li><a href="#">Connected</a></li>
          <li><a href="#">Pending</a></li>
          <li><a href="#">Offline</a></li>
        </ul>
      </div>
    </>
  );
}
