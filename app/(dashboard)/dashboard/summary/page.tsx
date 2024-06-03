"use client";

import LineChartCom from "@/app/components/chart/lineChartCom";
import { generateRandomData } from "@/utils/randomData";

const Summary = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "지난 주 일일 게시물 수",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const charts = [
    generateRandomData("Posts 1"),
    generateRandomData("Posts 2"),
    generateRandomData("Posts 3"),
    generateRandomData("Posts 4"),
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="text-2xl font-bold p-2 text-black">Summary</div>
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        {charts.map((chartData, index) => (
          <LineChartCom key={index} data={chartData} options={options} />
        ))}
      </div>
    </div>
  );
};

export default Summary;
