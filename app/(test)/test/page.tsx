"use client";

import KakaoShareButton from "@/app/components/button/kakaoShareBtn";
import React, { useState } from "react";

const Test = () => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [resultTimes, setResultTimes] = useState<string[]>([]);

  const calculateTime = () => {
    let currentHour = Number(hour);
    let currentMinute = Number(minute);

    let resultTime = [];

    for (let i = 0; i < 6; i++) {
      currentMinute -= 30;

      if (currentMinute < 0) {
        currentMinute += 60;
        currentHour -= 1;
      }

      currentHour -= 1;

      if (currentHour < 0) {
        currentHour += 24;
      }

      resultTime.unshift(
        `${currentHour.toString().padStart(2, "0")}:${currentMinute
          .toString()
          .padStart(2, "0")}`
      );
    }
    setResultTimes(resultTime);
  };

  const renderSelectOptions = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      const value = i < 10 ? `0${i}` : i.toString();
      options.push(<option key={i}>{value}</option>);
    }
    return options;
  };

  const shareDescription = `최적의 수면 시간 계산 결과입니다.\n3번째 이전에 자는 것을 권장합니다.\n${resultTimes
    .map((time, index) => `${index + 1}번째 : ${time}`)
    .join("\n")}`;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-container-bg rounded-3xl sm:w-full md:w-3/5 lg:w-1/3">
      <div>
        <h1 className="mb-8 text-2xl font-bold">
          🕖기상 시간을 체크해주세요.🕖
        </h1>
        <div className="flex items-center justify-center gap-5 mb-4">
          <div className="mb-4">
            <label htmlFor="hour-select" className="mr-2 font-bold">
              시 :
            </label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-24 font-bold text-center bg-gray-300 border border-gray-400 rounded-md"
            >
              {renderSelectOptions(0, 23)}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="minute-select" className="mr-2 font-bold">
              분 :
            </label>
            <select
              id="minute-select"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-24 font-bold text-center bg-gray-300 border border-gray-400 rounded-md"
            >
              {renderSelectOptions(0, 59)}
            </select>
          </div>
        </div>

        {resultTimes.length === 0 ? (
          <button
            className="px-4 py-2 font-bold text-white bg-black rounded-lg hover:bg-gray-800"
            onClick={calculateTime}
          >
            계산하기
          </button>
        ) : (
          <div>
            <div className="flex flex-col justify-center mt-8">
              <div className="text-xl font-bold">잠자기 최적의 시간</div>
              <div className="mb-4 font-bold">{resultTimes[0]}</div>
            </div>
            <div>
              <p>이후 잠자기 최적의 시간</p>
              {resultTimes.slice(1).map((time, index) => (
                <div className="mt-4" key={index}>
                  {index + 2}번째 추천 시간 {time}
                </div>
              ))}
            </div>
            <div className="flex justify-center h-10 gap-4 mt-8 align-center">
              <button
                className="px-4 py-2 font-bold text-white bg-black rounded-lg hover:bg-gray-800"
                onClick={calculateTime}
              >
                다시 계산하기
              </button>
              <KakaoShareButton description={shareDescription} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
