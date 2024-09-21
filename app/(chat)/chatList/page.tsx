"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // for navigation
import useStore from "@/store/tokenStore";
import axios from "axios";
import { deleteChatRoom, getChatList, getChatRoom } from "@/services/api";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiUserSmileLine } from "react-icons/ri";

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

  const handleChatRoomDelete = async (chatRoomId: string, nickname: string) => {
    try {
      if (!token) return;

      // 확인 창을 띄웁니다
      const confirmDelete = window.confirm(
        `${nickname}과의 채팅방을 나가시겠습니까?`
      );

      if (confirmDelete) {
        // 사용자가 확인을 누른 경우에만 삭제 API 호출
        await deleteChatRoom(token, chatRoomId);

        // 삭제 성공 시 UI 업데이트
        setChatListData((prevList) =>
          prevList.filter((chatRoom) => chatRoom.chatRoomId !== chatRoomId)
        );
        console.log(`Chat room ${chatRoomId} deleted`);
      }
    } catch (error) {
      console.error("Failed to delete chat room:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 pr-64 pl-64">
      <div className="flex-grow overflow-y-auto">
        {chatListData.map((item) => (
          <div key={item.chatRoomId} className="relative flex mb-4">
            <div
              className="flex-grow p-4 border rounded-lg shadow cursor-pointer bg-basic_0 hover:border-orange_3"
              onClick={() =>
                handleChatRoomClick(item.chatRoomId, item.chatMessageId)
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {/* <img
                    src={item.profile}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  /> */}
                  {/* <FaUserCircle className="text-2xl text-gray-600" /> */}
                  {/* <BiUserCircle className="w-full text-gray-600" /> */}
                  <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                    <IoPersonCircleOutline className="w-full text-gray_4 h-full" />
                  </div>
                  {/* <MdPerson className="text-2xl text-gray-600" />
                  <AiOutlineUser className="text-2xl text-gray-600" />
                  <RiUserSmileLine className="text-2xl text-gray-600" /> */}
                  <div>
                    <p className="text-gray_5 text-xl font-bold">
                      {item.nickname}
                    </p>
                    <p className="text-gray-600 ">
                      {truncateText(item.message)}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mr-10 text-webkit-center">
                  <p className="text-xs text-gray_4">
                    {new Date(item.time).toLocaleTimeString()}
                  </p>
                  <div
                    className={`text-white rounded-full w-6 h-6 flex items-center justify-center ${
                      item.notReadCnt === 0
                        ? "visibility-hidden bg_transparent"
                        : "bg-green_3"
                    }`}
                  >
                    {item.notReadCnt > 0 ? item.notReadCnt : null}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="absolute top-2 right-2 p-1 rounded-full flex items-center justify-center"
              onClick={() =>
                handleChatRoomDelete(item.chatRoomId, item.nickname)
              }
            >
              <FaTrash className="text-sm text-gray_3 hover:text-green_4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
