"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { SOCKET_URL } from "@/api/common";
import useStore from "@/store/tokenStore";
import { getChatRoom } from "@/services/api";
import { useSearchParams } from "next/navigation";
import useProfileStore from "@/store/profileStore";
import { FaPaperPlane } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

interface Message {
  nickname: string;
  userId: string;
  message: string;
  isMine: boolean;
  formattedTime: string;
  formattedDate: string;
  notReadCnt: number;
}

const ChatPage = () => {
  const searchParams = useSearchParams();
  const { token } = useStore();
  const { profile } = useProfileStore();

  const myId = profile.id;
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const chatRoomId = searchParams.get("chatRoomId");
  const chatMessageId = searchParams.get("chatMessageId");
  console.log("chatRoomId >>>", chatRoomId);
  console.log("chatMessageId >>>", chatMessageId);

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };

  const initializeWebSocket = async (chatRoomId: string) => {
    if (!token || client) {
      // 이미 연결되어 있거나 토큰이 없으면 실행하지 않음
      return;
    }

    console.log("연결됨 :::");
    const newClient = new Client({
      brokerURL: `ws://${SOCKET_URL}/stomp`,
      connectHeaders: { Authorization: `${token}` },
      onConnect: () => {
        console.log("Connected to WebSocket");
        newClient.subscribe(`/sub/room/${chatRoomId}`, (message) => {
          const parsedMessage: Message = JSON.parse(message.body);
          setReceivedMessages((prevMessages) => [
            ...prevMessages,
            {
              ...parsedMessage,
              isMine: parsedMessage.userId === myId,
              formattedTime: new Date().toLocaleTimeString(),
              formattedDate: new Date().toLocaleDateString(),
            },
          ]);
          scrollToEnd();
        });
      },
      onWebSocketError: (error) => {
        console.error("WebSocket Error: ", error);
      },
    });

    newClient.activate();
    setClient(newClient);
  };

  useEffect(() => {
    if (chatRoomId && token && !client) {
      // client가 없을 때만 WebSocket 초기화
      initializeWebSocket(chatRoomId);
      fetchPreviousMessages(); // 채팅방 진입 시 기존 메시지 불러오기
    }

    return () => {
      if (client) {
        client.deactivate();
        setClient(null);
      }
    };
  }, []);

  // 기존 채팅 기록 불러오기
  const fetchPreviousMessages = async () => {
    try {
      if (token && chatRoomId) {
        const chatMessages = await getChatRoom(
          token,
          chatRoomId,
          100,
          chatMessageId
        );

        const formattedMessages = chatMessages.flatMap((item: any) =>
          item.messages.map((msg: any) => ({
            userId: msg.userId,
            message: msg.message,
            isMine: msg.userId === myId,
            formattedTime: msg.time,
            formattedDate: item.createDate,
            nickname: msg.nickname,
            profile: msg.profile,
            notReadCnt: msg.notReadCnt,
          }))
        );

        setReceivedMessages(formattedMessages);
        console.log("formattedMessages :::", formattedMessages);
        scrollToEnd();
      }
    } catch (error) {
      console.error("Failed to fetch previous chat messages:", error);
    }
  };

  const sendMessage = () => {
    if (client && client.connected && currentMessage) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: chatRoomId,
          sendUserId: myId,
          message: currentMessage,
        }),
      });
      scrollToEnd();
    }
  };

  const sendMessageClick = () => {
    if (client && client.connected && currentMessage) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: chatRoomId,
          sendUserId: myId,
          message: currentMessage,
        }),
      });
      setCurrentMessage("");
      scrollToEnd();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Chat container */}
      <div
        ref={scrollViewRef}
        className="flex-grow overflow-y-auto p-4 mb-16 pl-12 pr-12"
      >
        {receivedMessages.map((message, index) => {
          // 이전 메시지의 userId와 비교
          const previousMessage = receivedMessages[index - 1];
          const showPersonIcon =
            !message.isMine &&
            (!previousMessage || previousMessage.userId !== message.userId);

          return (
            <div key={index} className="mb-2">
              {message.isMine ? (
                <div className="flex justify-end">
                  <div className="flex flex-row mt-6">
                    <p className="text-xs text-green_3 mr-4">
                      {message.notReadCnt === 2 ? 1 : null}
                    </p>
                    <span className="mr-2 text-xs text-gray_5">
                      {message.formattedTime}
                    </span>
                  </div>
                  <div className="bg-basic_0 text-gray_5 border border-black rounded-lg p-2 max-w-xs">
                    <span>{message.message}</span>
                  </div>
                </div>
              ) : (
                <>
                  {showPersonIcon && (
                    <div className="flex">
                      <AiOutlineUser className="text-2xl text-black" />
                      <span className="text-sm text-black">
                        {message.nickname}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-start">
                    <div className="bg-gray_0 border border-black text-black rounded-lg p-2 max-w-xs">
                      <span>{message.message}</span>
                    </div>
                    <span className="ml-2 text-xs text-gray_5 mt-6">
                      {message.formattedTime}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Input section */}
      <div className="fixed bottom-0 left-0 w-full bg-basic_0 p-4 border-t border-gray_1">
        <div className="flex">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-grow border border-gray_1 rounded-lg p-2 text-black focus:border-green_4 focus:outline-none"
            placeholder="Enter a message"
          />
          <button
            onClick={sendMessageClick}
            className="ml-4 bg-green_3 text-white rounded-lg p-2 flex items-center"
          >
            {/* <FaPaperPlane className="mr-2" /> */}
            {/* <IoPaperPlaneOutline className="mr-1" /> */}
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
