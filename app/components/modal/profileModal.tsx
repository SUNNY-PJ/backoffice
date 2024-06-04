"use client";

import React from "react";
import Image from "next/image";
import Sunny from "../../public/assets/Icon/sunny.svg";

interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ show, onClose, user }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white border-2 rounded-lg shadow-lg border-orange_4">
        {/* <h2 className="mb-4 text-2xl font-bold">User Profile</h2> */}
        <Image src={Sunny} alt="icon" width={60} height={60} className="mb-4" />
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <button
          className="px-4 py-2 mt-4 text-white rounded bg-orange_4 hover:bg-orange_5"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
