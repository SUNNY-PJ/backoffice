"use client";

import React, { useState } from "react";
import LeftMenu from "./leftMenu";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("권수연");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="relative flex h-screen">
      <LeftMenu isSidebarOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={closeSidebar}
        ></div>
      )}
      <div className="flex flex-col flex-1">
        <Header
          username={username}
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 p-4 mt-14 bg-basic_1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
