import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    // 클라이언트로부터 전달받은 Authorization 헤더에서 토큰 추출
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    // 외부 API에 Axios를 사용하여 토큰을 포함한 요청 보내기
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/chat/room`,
      {
        headers: {
          Authorization: token, // 토큰을 헤더에 포함시킴
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    // 외부 API로부터 받은 데이터를 클라이언트로 전달
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
