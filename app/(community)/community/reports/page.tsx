"use client";

import React, { useEffect, useRef, useState } from "react";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import "react-tabulator/css/tabulator.min.css";
// import "react-tabulator/css/semantic-ui/tabulator_semantic-ui.min.css";
import "react-tabulator/css/tabulator_simple.min.css";

interface Report {
  id: number;
  reporter: string;
  reportedUser: string;
  reason: string;
  date: string;
  status: string;
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const tableRef = useRef<any>(null);

  useEffect(() => {
    // 신고 데이터 로드 (예: API 호출)
    const fetchReports = async () => {
      // 예시 데이터
      const data: Report[] = [
        {
          id: 1,
          reporter: "user1",
          reportedUser: "user2",
          reason: "abuse",
          date: "2023-01-01",
          status: "pending",
        },
        {
          id: 2,
          reporter: "user3",
          reportedUser: "user4",
          reason: "spam",
          date: "2023-01-02",
          status: "in-progress",
        },
        {
          id: 3,
          reporter: "user5",
          reportedUser: "user6",
          reason: "harassment",
          date: "2023-01-03",
          status: "completed",
        },
        {
          id: 4,
          reporter: "user7",
          reportedUser: "user8",
          reason: "abuse",
          date: "2023-01-04",
          status: "pending",
        },
        {
          id: 5,
          reporter: "user9",
          reportedUser: "user10",
          reason: "spam",
          date: "2023-01-05",
          status: "in-progress",
        },
        {
          id: 6,
          reporter: "user11",
          reportedUser: "user12",
          reason: "harassment",
          date: "2023-01-06",
          status: "completed",
        },
        {
          id: 7,
          reporter: "user13",
          reportedUser: "user14",
          reason: "abuse",
          date: "2023-01-07",
          status: "pending",
        },
        {
          id: 8,
          reporter: "user15",
          reportedUser: "user16",
          reason: "spam",
          date: "2023-01-08",
          status: "in-progress",
        },
        {
          id: 9,
          reporter: "user17",
          reportedUser: "user18",
          reason: "harassment",
          date: "2023-01-09",
          status: "completed",
        },
        {
          id: 10,
          reporter: "user19",
          reportedUser: "user20",
          reason: "abuse",
          date: "2023-01-10",
          status: "pending",
        },
        // 추가 데이터...
      ];
      setReports(data);
    };
    fetchReports();
  }, []);

  const columns: ColumnDefinition[] = [
    { title: "ID", field: "id", sorter: "number", width: 100 },
    { title: "신고자", field: "reporter", sorter: "string" },
    { title: "신고 대상자", field: "reportedUser", sorter: "string" },
    { title: "사유", field: "reason", sorter: "string" },
    { title: "날짜", field: "date", sorter: "date", hozAlign: "center" },
    {
      title: "상태",
      field: "status",
      editor: "select",
      editorParams: { values: ["pending", "in-progress", "completed"] },
    },
  ];

  const options = {
    movableColumns: true,
    layout: "fitColumns",
    responsiveLayout: "hide",
    pagination: "local",
    paginationSize: 10,
  };

  return (
    <div>
      <h1>사용자 신고 관리</h1>
      <ReactTabulator
        ref={tableRef}
        data={reports}
        columns={columns}
        tooltips={true}
        layout={"fitData"}
        options={options}
      />
    </div>
  );
};

export default Report;
