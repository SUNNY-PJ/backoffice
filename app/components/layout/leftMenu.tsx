"use client";

import { MENU_DATA } from "@/data/menu";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/yellow_sunny.svg";

type LeftMenuProps = {
  isSidebarOpen: boolean;
};

const LeftMenu = ({ isSidebarOpen }: LeftMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("");

  useEffect(() => {
    setSelectedPath(pathname);

    MENU_DATA.forEach((menu, index) => {
      if (menu.subMenu.some((subMenu) => subMenu.path === pathname)) {
        setOpenMenuIndex(index);
      }
    });
  }, [pathname]);

  const handleMenuClick = (path: string) => {
    setSelectedPath(path);
    router.push(path);
  };

  const toggleSubMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <nav
      className={`w-64 bg-basic_4 text-gray_4 font-medium h-full p-4 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-10`}
    >
      <ul>
        {MENU_DATA.map((menu, index) => (
          <li key={index} className="mb-2">
            <div
              onClick={() => toggleSubMenu(index)}
              className={`p-2 flex items-center rounded cursor-pointer gap-1 mb-1 ${
                openMenuIndex === index ||
                menu.subMenu.some((subMenu) => subMenu.path === selectedPath)
                  ? "font-bold text-black"
                  : "hover:text-black"
              }`}
            >
              {menu.title}
              {(openMenuIndex === index ||
                menu.subMenu.some(
                  (subMenu) => subMenu.path === selectedPath
                )) && (
                <Image
                  src={Sunny}
                  alt="icon"
                  width={20}
                  height={20}
                  className=""
                />
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openMenuIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              {menu.subMenu && (
                <ul className="pl-4">
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      <div
                        onClick={() => handleMenuClick(subMenu.path)}
                        className={`p-2 block rounded cursor-pointer ${
                          selectedPath === subMenu.path
                            ? "bg-basic_1 text-black"
                            : "hover:text-black"
                        }`}
                      >
                        {subMenu.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftMenu;
