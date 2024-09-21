"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// 사용자 정보를 담는 타입 정의
interface KakaoUserInfo {
  kakao_account: {
    profile: {
      nickname: string;
    };
    email: string;
  };
}

const KakaoCallback: React.FC = () => {
  // console.log("진입함 ::::");
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");
  // const [userInfo, setUserInfo] = useState<KakaoUserInfo | null>(null);

  // console.log("Code", code);

  // useEffect(() => {
  //   if (code) {
  //     const fetchData = async () => {
  //       const inputURL = `/auth/kakao/callback`; // 백엔드 엔드포인트 URL
  //       try {
  //         const response = await axios.get(inputURL, {
  //           params: { code: code },
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         });
  //         console.log("response.data >>>", response.data);

  //         const { accessToken } = response.data;
  //         if (accessToken) {
  //           localStorage.setItem("jwt", accessToken);
  //           console.log("JWT Token:", accessToken);

  //           // JWT 토큰을 이용해 사용자 정보를 요청
  //           const userInfoResponse = await axios.get("/auth/user-info", {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           });

  //           setUserInfo(userInfoResponse.data);
  //         } else {
  //           console.error("JWT token not found in the response");
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch JWT:", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [code]);

  // if (!userInfo) {
  //   return (
  //     <div style={{ color: "#000" }}>
  //       <div>Loading ... ... ...</div>
  //       <p>안녕하세요 카카오 페이지입니다.</p>
  //     </div>
  //   );
  // }

  return (
    <div style={{ color: "#000" }}>
      {/* <h1>Welcome, {userInfo.kakao_account.profile.nickname}</h1>
      <p>이메일: {userInfo.kakao_account.email}</p> */}
      {/* 추가 사용자 정보 표시 */}
    </div>
  );
};

export default KakaoCallback;
