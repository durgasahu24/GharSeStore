import React, { useState } from 'react';
import Sidebar from '../../../Admin/Sidebar';
import Body from '../../../Admin/Body'



const AdminRouter = () => {
  const [activeOption, setActiveOption] = useState('orders'); // Track the active sidebar option
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Handle mobile sidebar toggle


  return (

    <div className="flex flex-col md:flex-row min-h-screen">

      
      {/* Mobile Navbar */}
      <div className="bg-gray-800 text-white md:hidden flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-700 rounded"
        >
          {/* Hamburger Icon */}
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-gray-800 text-white w-64 p-4 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0`}
      >
        <Sidebar
          activeOption={activeOption}
          onSelectOption={(option) => {
            setActiveOption(option); // Update selected option
            setIsSidebarOpen(false); // Close sidebar on mobile
          }}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Body Content */}
      <div className="flex-1 bg-gray-100 p-4">
        <Body activeOption={activeOption} />
      </div>
    </div>
  );
};

export default AdminRouter;
