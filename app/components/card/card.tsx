"use client";

import React from "react";

interface CardProps {
  title: string;
  count: number;
  icon: any;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
      <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default Card;
