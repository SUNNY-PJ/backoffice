"use client";

import React, { useState } from "react";
import LeftMenu from "./leftMenu";
import Header from "./header";
import useProfileStore from "@/store/profileStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useProfileStore();

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
    <div className="relative flex h-screen bg-basic_1">
      <LeftMenu isSidebarOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-opacity-50"
          onClick={closeSidebar}
        />
      )}
      <div className="flex flex-col flex-1">
        <Header
          username={
            `Welcome, ${profile.name}` || "로그인이 필요한 서비스입니다."
          }
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto bg-basic_1 mt-14">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
