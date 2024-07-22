"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoLogin = () => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      setIsKakaoLoaded(true);
    }
  }, []);

  const handleKakaoLoad = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    setIsKakaoLoaded(true);
  };

  const loginWithKakao = () => {
    if (!isKakaoLoaded || !window.Kakao.Auth) {
      console.error("Kakao SDK is not loaded.");
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
      //   redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    });
  };

  const displayToken = () => {
    const token = getCookie("authorize-access-token");

    if (token) {
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then((res: any) => {
          if (res.status === "connected") {
            document.getElementById("token-result")!.innerText =
              "login success, token: " + window.Kakao.Auth.getAccessToken();
          }
        })
        .catch(() => {
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  };

  const getCookie = (name: string) => {
    const parts = document.cookie.split(name + "=");
    if (parts.length === 2) {
      return parts[1].split(";")[0];
    }
  };

  useEffect(() => {
    if (isKakaoLoaded) {
      displayToken();
    }
  }, [isKakaoLoaded]);

  return (
    <div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        onLoad={handleKakaoLoad}
      />
      <a
        id="kakao-login-btn"
        onClick={loginWithKakao}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </a>
      <p id="token-result"></p>
    </div>
  );
};

export default KakaoLogin;
