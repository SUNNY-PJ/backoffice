"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/summary");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">SUNNY 앱 관리 페이지</h1>
      <p>환영합니다! 여기는 대시보드 페이지입니다.</p>
    </div>
  );
};

export default Home;
