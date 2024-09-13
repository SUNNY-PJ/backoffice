"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { SOCKET_URL } from "@/api/common";

interface Message {
  userId: string;
  message: string;
  isMine: boolean;
  formattedTime: string;
  formattedDate: string;
}

const ChatPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>(""); // Token stored in state
  const [inputToken, setInputToken] = useState<string>(""); // Temporary token for input in modal

  const scrollViewRef = useRef<HTMLDivElement | null>(null);

  // Mock profile, use real data in production
  const profile = { id: "myUserId" };
  const myId = profile.id;

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };

  // WebSocket initialization with the token
  const initializeWebSocket = async (chatRoomId: string) => {
    if (!token) {
      console.error("No access token found. Please enter a token.");
      return;
    }

    const newClient = new Client({
      brokerURL: `ws://${SOCKET_URL}/stomp`,
      connectHeaders: { Authorization: `Bearer ${token}` },
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
    if (roomId && token) {
      initializeWebSocket(roomId);
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [roomId, token]);

  // Send message function
  const sendMessage = () => {
    if (client && client.connected && currentMessage) {
      client.publish({
        destination: "/pub/chat/message/room",
        body: JSON.stringify({
          roomId: roomId,
          sendUserId: myId,
          message: currentMessage,
        }),
      });
      setCurrentMessage("");
      scrollToEnd();
    }
  };

  // Modal open/close handlers
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTokenSubmit = () => {
    setToken(inputToken);
    closeModal();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Token input button */}
      <button
        onClick={openModal}
        className="absolute top-20 right-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Enter Token
      </button>

      {/* Chat container */}
      <div ref={scrollViewRef} className="flex-grow overflow-y-auto p-4 mb-20">
        {receivedMessages.map((message, index) => (
          <div key={index} className="mb-2">
            {message.isMine ? (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                  <span>{message.message}</span>
                </div>
                <span className="ml-2 text-xs text-gray-500">
                  {message.formattedTime}
                </span>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-gray-300 text-black rounded-lg p-2 max-w-xs">
                  <span>{message.message}</span>
                </div>
                <span className="ml-2 text-xs text-gray-500">
                  {message.formattedTime}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg p-2"
            placeholder="Enter a message"
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-blue-500 text-white rounded-lg p-2"
          >
            Send
          </button>
        </div>
      </div>

      {/* Modal for entering token */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter Token</h2>
            <input
              type="text"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your API token"
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleTokenSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
