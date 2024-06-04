"use client";

import React, { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import "tabulator-tables/dist/css/tabulator_simple.min.css";
import { Tabulator } from "tabulator-tables";

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
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 임시 사용자 10명 생성
    const generatedUsers = generateUsers(10);
    setUsers(generatedUsers);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      new Tabulator(tableRef.current, {
        data: users,
        layout: "fitColumns",
        columns: [
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
        ],
      });
    }
  }, [users]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>
      <div ref={tableRef}></div>
    </div>
  );
};

export default List;
