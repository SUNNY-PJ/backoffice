import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const KakaoCallback = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log("Authorization code:", code);
    router.push("/mypage");

    if (code) {
      axios
        .post("/api/auth/kakao", { code })
        .then((response) => {
          console.log("Response from backend:", response.data);
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem("kakao_access_token", accessToken);
          localStorage.setItem("kakao_refresh_token", refreshToken);
          router.push("/mypage");
        })
        .catch((error) => {
          console.error("Failed to fetch token:", error);
        });
    }
  }, [code]);

  return (
    <>
      <div>Loading ... ... ...</div>
      <p>안녕하세요 카카오 페이지입니다.</p>
    </>
  );
};

export default KakaoCallback;
