"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/sunny.svg";
import AlertModal from "../modal/alertModal";
import AdminProfileModal from "../modal/adminProfileModal";
import { useRouter } from "next/navigation";
import { NOTIFICATION } from "@/data/mock";
import KakaoModal from "../modal/login/kakaoModal";

type HeaderProps = {
  username: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
};

const Header = ({ username, onLogout, onToggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openKakao, setOpenKakao] = useState(false);

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000); // 1초 후에 애니메이션 클래스 제거
  };

  const handleAlertBtnClick = () => {
    setOpenAlert(!openAlert);
    console.log("알림 버튼 누름 ::: ", openAlert);
  };
  const handleProfileClick = () => {
    setOpenProfile(true);
  };

  const handleLoginClick = () => {
    setOpenKakao(true);
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
        <div
          className="text-lg font-bold cursor-pointer"
          onClick={() => {
            router.push("/dashboard/summary");
          }}
        >
          Welcome, {username}!
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <button
          onClick={handleLoginClick}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          로그인
        </button>
        {openKakao && (
          <KakaoModal show={openKakao} onClose={() => setOpenKakao(false)} />
        )}
        <button
          onClick={handleProfileClick}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          프로필
        </button>
        {openProfile && (
          <AdminProfileModal
            show={openProfile}
            onClose={() => setOpenProfile(false)}
            user={{
              id: "user35",
              name: "옥슈슈깡",
              email: "6suyeon@naver.com",
              phone: "010-2320-4131",
            }}
          />
        )}
        <button
          onClick={handleAlertBtnClick}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          알림
        </button>
        {openAlert && (
          <div className="absolute right-0 mt-2 top-full">
            <AlertModal
              notifications={NOTIFICATION}
              onClose={() => setOpenAlert(false)}
            />
          </div>
        )}
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
