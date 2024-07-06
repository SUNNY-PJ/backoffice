"use client";

import React from "react";
import Image from "next/image";
import Sunny from "../../../../public/assets/Icon/sunny.svg";
import { REST_API_KEY, REDIRECT_URI } from "@/api/common";

interface KakaoModalProps {
  show: boolean;
  onClose: () => void;
}

const KakaoModal: React.FC<KakaoModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const KAKAO_URL = "https://kauth.kakao.com/oauth/authorize";
  const kakao_url = `${KAKAO_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakao_url;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white border-2 rounded-lg shadow-lg border-orange_4">
        <Image src={Sunny} alt="icon" width={60} height={60} className="mb-4" />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 mt-4 text-white rounded bg-orange_4 hover:bg-orange_5"
            onClick={handleKakaoLogin}
          >
            kakao login
          </button>
          <button
            className="px-4 py-2 mt-4 text-white rounded bg-orange_4 hover:bg-orange_5"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoModal;
