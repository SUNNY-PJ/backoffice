"use client";
import React from "react";

type CommentProps = {
  username: string;
  message: string;
};

const AlertContent = ({ username, message }: CommentProps) => {
  return (
    <div className="flex flex-col items-start p-4 mb-4 bg-white rounded-lg shadow-lg">
      <div className="mb-1 text-sm text-gray-500">새로운 알림</div>
      <div className="mb-1 font-bold text-black">@{username}</div>
      <div className="text-gray-800">{message}</div>
    </div>
  );
};

export default AlertContent;
