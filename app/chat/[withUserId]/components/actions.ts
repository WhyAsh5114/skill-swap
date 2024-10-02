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
