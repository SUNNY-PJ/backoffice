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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
};

export const getChatRoom = async (
  token: string,
  chatRoomId: string,
  size: number,
  chatMessageId: any
) => {
  try {
    const response = await axios.get(
      `/api/chat/chatRoom?chatRoomId=${chatRoomId}&size=${size}&chatMessageId=${chatMessageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
};

export const deleteChatRoom = async (token: string, chatRoomId: string) => {
  try {
    const response = await axios.delete(
      `/api/chat/delete?chatRoomId=${chatRoomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting chat room:", error);
    throw error;
  }
};
