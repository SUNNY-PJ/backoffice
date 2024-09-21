import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PROXY_URL } from "@/api/common";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const chatRoomId = searchParams.get("chatRoomId");
    const size = searchParams.get("size");
    const chatMessageId = searchParams.get("chatMessageId");

    if (!chatRoomId || !size || !chatMessageId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const response = await axios.get(`${PROXY_URL}/chat/${chatRoomId}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        size: size,
        chatMessageId: chatMessageId,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
