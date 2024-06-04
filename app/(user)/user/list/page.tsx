"use client";

import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// 임시 사용자 데이터 생성 함수
const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });
  }
  return users;
};

const List = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // 임시 사용자 10명 생성
    const generatedUsers = generateUsers(10);
    setUsers(generatedUsers);
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b">{user.id}</td>
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
