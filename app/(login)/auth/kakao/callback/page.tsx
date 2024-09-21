"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const KakaoCallback: React.FC = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");
  // const [userInfo, setUserInfo] = useState<KakaoUserInfo | null>(null);

  // console.log("Code", code);

  // useEffect(() => {
  //   if (code) {
  //     const fetchData = async () => {
  //       const inputURL = `/auth/kakao/callback`;
  //       try {
  //         const response = await axios.get(inputURL, {
  //           params: { code: code },
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         });
  //         console.log("response.data >>>", response.data);

  //         // Assuming the response contains the JWT token
  //         const { accessToken } = response.data;
  //         console.log("123123", response);
  //         if (accessToken) {
  //           localStorage.setItem("jwt", accessToken);
  //           console.log("JWT Token:", accessToken);
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
