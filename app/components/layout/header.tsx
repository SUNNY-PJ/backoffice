"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/sunny.svg";

type HeaderProps = {
  username: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
};

const Header = ({ username, onLogout, onToggleSidebar }: HeaderProps) => {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000); // 1초 후에 애니메이션 클래스 제거
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-2 text-black bg-orange_2">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            onToggleSidebar();
            handleClick();
          }}
        >
          <Image
            src={Sunny}
            width={40}
            height={40}
            alt="SUNNY"
            className={rotate ? "rotate-animation" : ""}
          />
        </button>
        <div className="text-lg font-bold">Welcome, {username}!</div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => alert("프로필 버튼 클릭")}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          프로필
        </button>
        <button
          onClick={() => alert("알림 버튼 클릭")}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          알림
        </button>
        <button
          onClick={onLogout}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
