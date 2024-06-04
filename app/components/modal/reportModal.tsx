"use client";

import React from "react";

interface ReportModalProps {
  show: boolean;
  onClose: () => void;
  report: {
    id: number;
    reporter: string;
    reportedUser: string;
    reason: string;
    date: string;
    status: string;
  } | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ show, onClose, report }) => {
  if (!show || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white border-2 rounded-lg shadow-lg border-orange_4">
        <h2 className="mb-4 text-2xl font-bold text-orange_4">
          신고 상세 내용
        </h2>
        <div className="mb-4">
          <strong>ID:</strong> {report.id}
        </div>
        <div className="mb-4">
          <strong>신고자:</strong> {report.reporter}
        </div>
        <div className="mb-4">
          <strong>신고 대상자:</strong> {report.reportedUser}
        </div>
        <div className="mb-4">
          <strong>사유:</strong> {report.reason}
        </div>
        <div className="mb-4">
          <strong>날짜:</strong> {report.date}
        </div>
        <div className="mb-4">
          <strong>상태:</strong> {report.status}
        </div>
        <button
          className="px-4 py-2 mt-4 text-white rounded bg-orange_4 hover:bg-orange_5"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
