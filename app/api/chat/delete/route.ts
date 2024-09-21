import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PROXY_URL } from "@/api/common";

export async function DELETE(req: NextRequest) {
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

    if (!chatRoomId) {
      return NextResponse.json(
        { error: "Missing chatRoomId parameter" },
        { status: 400 }
      );
    }

    const response = await axios.delete(
      `${PROXY_URL}/chat/room/${chatRoomId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error deleting chat room:", error);
    return NextResponse.json(
      { error: "Failed to delete chat room" },
      { status: 500 }
    );
  }
}
