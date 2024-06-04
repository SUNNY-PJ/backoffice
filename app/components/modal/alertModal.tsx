"use client";

import React from "react";

type AlertProps = {
  notifications: { username: string; message: string }[];
  onClose: () => void;
};

const AlertModal = ({ notifications, onClose }: AlertProps) => {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="absolute z-50 w-64 p-4 bg-white rounded-lg shadow-lg right-12 top-16"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold">새로운 알림</div>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            닫기
          </button>
        </div>
        {notifications.map((notification, index) => (
          <div key={index} className="mb-2">
            <div className="text-sm text-gray-500">
              @{notification.username}
            </div>
            <div className="text-black">{notification.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertModal;
