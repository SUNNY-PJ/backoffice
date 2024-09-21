"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // for navigation
import useStore from "@/store/tokenStore";
import axios from "axios";
import { getChatList, getChatRoom } from "@/services/api";

interface ChatRoom {
  chatRoomId: string;
  chatMessageId: string;
  profile: string;
  nickname: string;
  message: string;
  time: string;
  notReadCnt: number;
}

const ChatList = () => {
  const router = useRouter();
  const [chatListData, setChatListData] = useState<ChatRoom[]>([]);
  const { token } = useStore();

  console.log("token :::", token);

  useEffect(() => {
    const fetchChatList = async () => {
      if (!token) return;

      try {
        const results = await getChatList(token);
        setChatListData(results);

        console.log("채팅 리스트 :::", results);
      } catch (error) {
        console.error("Failed to fetch chat list:", error);
      }
    };

    fetchChatList();
  }, [token]);

  const truncateText = (text: string) => {
    const maxLength = 20;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleChatRoomClick = (chatRoomId: string, chatMessageId: string) => {
    // 채팅방 페이지로 이동
    router.push(
      `/chat?chatRoomId=${chatRoomId}&chatMessageId=${chatMessageId}`
    );
  };

  const handleChatRoomDelete = async (chatRoomId: string) => {
    console.log(chatRoomId);
    // try {
    //   const response = await fetch(`/chat/room/${chatRoomId}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.ok) {
    //     alert("Chat room deleted");
    //     // fetchData();
    //   } else {
    //     console.error("Failed to delete chat room");
    //   }
    // } catch (error) {
    //   console.error("Error deleting chat room:", error);
    // }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-y-auto">
        {chatListData.map((item) => (
          <div
            key={item.chatRoomId}
            className="mb-4 p-4 border rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={item.profile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">{item.nickname}</p>
                  <p className="text-gray-600">{truncateText(item.message)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(item.time).toLocaleTimeString()}
                </p>
                {item.notReadCnt > 0 && (
                  <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {item.notReadCnt}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black py-1 px-2 rounded"
                onClick={() =>
                  handleChatRoomClick(item.chatRoomId, item.chatMessageId)
                }
              >
                Enter Chat
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => handleChatRoomDelete(item.chatRoomId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
