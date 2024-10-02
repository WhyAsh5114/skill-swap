"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function sendMessageAction(message: string, toUserId: string) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const messageObject = await prisma.message.create({
    data: {
      createdAt: new Date(),
      text: message,
      fromUserId: user.id,
      toUserId,
    },
  });

  return messageObject;
}

export async function getNewMessages(
  lastMessageAt: EpochTimeStamp,
  withUserId: string
) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user.id, toUserId: withUserId },
        { fromUserId: withUserId, toUserId: user.id },
      ],
      createdAt: { gt: new Date(lastMessageAt) },
    },
    orderBy: { createdAt: "asc" },
  });
}
