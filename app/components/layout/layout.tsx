"use client";

import React, { useState } from "react";
import LeftMenu from "./leftMenu";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [username, setUsername] = useState("권수연");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="flex h-screen">
      <LeftMenu isSidebarOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out pt-14 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header
          username={username}
          onLogout={handleLogout}
          onToggle={toggleSidebar}
        />
        <main className="p-4 bg-basic_1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
