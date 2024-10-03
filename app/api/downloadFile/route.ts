import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fromUserId = req.nextUrl.searchParams.get("fromUserId");
  const toUserId = req.nextUrl.searchParams.get("toUserId");
  const createdAt = Number(req.nextUrl.searchParams.get("createdAt"));

  if (!fromUserId || !toUserId || isNaN(createdAt)) {
    return new Response("Invalid params", { status: 400 });
  }

  const data = await prisma.message.findUnique({
    where: {
      fromUserId_toUserId_createdAt: {
        fromUserId,
        toUserId,
        createdAt: new Date(createdAt),
      },
    },
    select: { file: true },
  });

  if (!data || !data.file) {
    return new Response("File not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/octet-stream");

  return new Response(data.file, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
