"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sunny from "../../../public/assets/Icon/sunny.svg";
import useStore from "@/store/tokenStore";
import { getUserProfile } from "@/services/api";

interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
}

const AdminProfileModal = ({ show, onClose }: ProfileModalProps) => {
  if (!show) return null;
  const [profile, setProfile] = useState<any>({});

  const { token } = useStore();

  console.log("token :::", token);

  useEffect(() => {
    const fetchChatList = async () => {
      if (!token) return;

      try {
        const results = await getUserProfile(token);
        setProfile(results);

        console.log("프로필 정보 :::", results);
      } catch (error) {
        console.error("Failed to fetch chat list:", error);
      }
    };

    fetchChatList();
  }, [token]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white border-2 rounded-lg shadow-lg border-orange_4">
        <Image src={Sunny} alt="icon" width={60} height={60} className="mb-4" />
        <p>
          <strong>ID:</strong> {profile.id}
        </p>
        <p>
          <strong>Name:</strong> {profile.name}
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

export default AdminProfileModal;
