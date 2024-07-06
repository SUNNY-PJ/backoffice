interface KakaoProfile {
  nickname: string;
  thumbnail_image_url?: string;
  profile_image_url?: string;
}

interface KakaoAccount {
  profile: KakaoProfile;
  email?: string;
}

interface KakaoUserInfo {
  id: number;
  kakao_account: KakaoAccount;
}
