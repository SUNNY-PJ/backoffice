"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/sunny.svg";
import AlertModal from "../modal/alertModal";
import AdminProfileModal from "../modal/adminProfileModal";
import { useRouter } from "next/navigation";
import { NOTIFICATION } from "@/data/mock";
import KakaoModal from "../modal/login/kakaoModal";
import useStore from "@/store/tokenStore";

type HeaderProps = {
  username: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
};

const Header = ({ username, onLogout, onToggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const [rotate, setRotate] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openKakao, setOpenKakao] = useState<boolean>(false);
  const [inputToken, setInputToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Use Zustand's store
  const { setToken } = useStore();

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // When user submits the token, store it in Zustand
  const handleTokenSubmit = () => {
    setToken(inputToken); // Store the token in Zustand
    closeModal();
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
          onClick={openModal}
          className="px-2 py-1 font-bold text-black border rounded sm:px-4 sm:py-2 border-orange_4 bg-basic_1 hover:border-orange_5 hover:bg-basic_2 hover:text-gray_6"
        >
          로그인
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Enter Token</h2>
              <input
                type="text"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Enter your API token"
              />
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTokenSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
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
