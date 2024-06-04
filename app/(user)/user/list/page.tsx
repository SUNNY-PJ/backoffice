"use client";

import React, { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import "tabulator-tables/dist/css/tabulator_simple.min.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import ProfileModal from "@/app/components/modal/profileModal";

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

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 임시 사용자 20명 생성
    const generatedUsers = generateUsers(20);
    setUsers(generatedUsers);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      new Tabulator(tableRef.current, {
        data: users,
        layout: "fitColumns",
        pagination: true, // 페이징 활성화
        paginationMode: "local", // 로컬 페이징
        paginationSize: 10, // 페이지당 항목 수
        paginationInitialPage: 1, // 초기 페이지 번호
        columns: [
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
          {
            title: "Actions",
            formatter: (cell, formatterParams, onRendered) => {
              const button = document.createElement("button");
              button.className =
                "px-2 py-1 text-black border rounded border-orange_4 bg-orange_0 hover:border-orange_5 hover:bg-orange_1 hover:text-gray_6";
              button.textContent = "profile";
              button.addEventListener("click", () => {
                const userData = cell.getRow().getData() as User;
                setSelectedUser(userData);
                setIsModalOpen(true);
              });
              return button;
            },
            hozAlign: "center",
          },
        ],
      });
    }
  }, [users]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>
      <div ref={tableRef}></div>
      {selectedUser && (
        <ProfileModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserList;
