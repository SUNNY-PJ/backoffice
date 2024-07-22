"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import KakaoImage from "@/public/assets/image/kakao_login_small.png";

type KakaoShareButtonProps = {
  description: string;
};

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = ({ description }: KakaoShareButtonProps) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "text",
        text: description,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      });
    } else {
      console.error("Kakao SDK is not loaded.");
    }
  };

  return (
    <div onClick={handleShare}>
      <Image
        className="w-10 h-10 cursor-pointer"
        src={KakaoImage}
        alt="카카오톡 공유 이미지"
      />
    </div>
  );
};

export default KakaoShareButton;
