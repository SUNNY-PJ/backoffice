"use client";

import React from "react";
import LineChart from "./lineChart";

type LineChartComProps = {
  data: any;
  options: any;
};

const LineChartCom: React.FC<LineChartComProps> = ({ data, options }) => {
  return (
    <div className="w-full max-w-2xl">
      <LineChart data={data} options={options} />
    </div>
  );
};

export default LineChartCom;
