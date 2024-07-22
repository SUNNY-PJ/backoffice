import { Props } from "next/script";
import { useEffect } from "react";

const redirectUri = `http://localhost:3000/oauth/callback/kakao`;
const scope = [
  "profile_nickname",
  "profile_image",
  "account_email",
  "gender",
  "age_range",
  "birthday",
  "friends",
  "openid",
].join(",");

export default function Login({}: Props) {
  useEffect(() => {
    console.log("window.Kakao: ", window.Kakao);
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log("after Init: ", window.Kakao.isInitialized());
      }
    }
  }, []);

  // 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log("after Init: ", window.Kakao.isInitialized());
      }
    }
  }, [window.Kakao]);

  const kakaoLoginHandler = () => {
    // 인가 코드 받기 위해서, 리다이렉트 페이지로 이동
    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
    console.log("Kakao Logining"); // 확인용 로그
  };

  return <button onClick={kakaoLoginHandler}>카카오 로그인</button>;
}
