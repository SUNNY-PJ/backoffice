"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/sunny.svg";

type HeaderProps = {
  username: string;
  onLogout: () => void;
  onToggle: () => void;
};

const Header = ({ username, onLogout, onToggle }: HeaderProps) => {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000); // 1초 후에 애니메이션 클래스 제거
  };

  return (
    <header className="bg-orange_3 text-black p-2 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            onToggle();
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
      <div className="flex items-center space-x-4">
        <button
          onClick={() => alert("프로필 버튼 클릭")}
          className="bg-orange_1 hover:bg-orange_0 text-gray_5 font-bold py-2 px-4 rounded"
        >
          프로필
        </button>
        <button
          onClick={() => alert("알림 버튼 클릭")}
          className="bg-orange_1 hover:bg-orange_0 text-gray_5 font-bold py-2 px-4 rounded"
        >
          알림
        </button>
        <button
          onClick={onLogout}
          className="bg-orange_1 hover:bg-orange_0 text-gray_5 font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
