"use client";

import LineChartCom from "@/app/components/chart/lineChartCom";
import { generateRandomData } from "@/utils/randomData";

const Summary = () => {
  const baseOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const charts = [
    {
      data: generateRandomData("가입자"),
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "일일 가입자 수",
          },
        },
      },
    },
    {
      data: generateRandomData("게시물"),
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "일일 게시물 수",
          },
        },
      },
    },
    {
      data: generateRandomData("진행중 대결"),
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "진행 중인 대결 수",
          },
        },
      },
    },
    {
      data: generateRandomData("활동량"),
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          title: {
            display: true,
            text: "일일 사용자 활동량",
          },
        },
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 text-2xl font-bold">Summary</div>
      <div className="grid flex-1 grid-cols-2 gap-4 p-4">
        {charts.map((chart, index) => (
          <LineChartCom key={index} data={chart.data} options={chart.options} />
        ))}
      </div>
    </div>
  );
};

export default Summary;
