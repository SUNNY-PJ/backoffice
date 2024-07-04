"use client";

import React from "react";
import Image from "next/image";
import Sunny from "../../../../public/assets/Icon/sunny.svg";
import { REST_API_KEY, REDIRECT_URI } from "../../../../api/common.js";
import axios from "axios";

interface KakaoModalProps {
  show: boolean;
  onClose: () => void;
}

const KAKAO_URL = "https://kauth.kakao.com/oauth/authorize";

const KakaoModal: React.FC<KakaoModalProps> = ({ show, onClose }) => {
  const kakao_url = `${KAKAO_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}/auth/kakao/callback&response_type=code`;

  const handleKakaoLoginCLick = () => {
    console.log("kakao login click");
    fetchData();
  };

  const fetchData = async () => {
    console.log("카카오 fetch 실행");
    try {
      const response = await axios.get(kakao_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      // const access_token = response.headers.authorization;
      const access_token = response.data.data.accessToken;
      const refresh_token = response.data.data.refreshToken;
      console.log("저장함::", access_token);
      // postData();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white border-2 rounded-lg shadow-lg border-orange_4">
        <Image src={Sunny} alt="icon" width={60} height={60} className="mb-4" />
        <div className="flex gap-4">
          <button
            className="px-4 py-2 mt-4 text-white rounded bg-orange_4 hover:bg-orange_5"
            onClick={handleKakaoLoginCLick}
          >
            카카오 로그인
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
