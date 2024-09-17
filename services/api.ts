import axios from "axios";

// Zustand에서 가져온 토큰을 받아서 헤더에 포함시키는 함수로 수정
export const getChatList = async (token: string) => {
  try {
    const response = await axios.get("/api/chat/chatList", {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error; // 에러 발생 시 호출한 곳에서 처리할 수 있도록 에러를 던짐
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
};
