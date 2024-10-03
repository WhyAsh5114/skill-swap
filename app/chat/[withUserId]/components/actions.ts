"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function sendMessageAction(
  message: string,
  toUserId: string,
  file?: File
) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const createData: Prisma.MessageUncheckedCreateInput = {
    createdAt: new Date(),
    text: message,
    fromUserId: user.id,
    toUserId,
  };

  if (file) {
    createData.filename = file.name;
    createData.file = Buffer.from(await file.arrayBuffer());
  }

  await prisma.message.create({
    data: createData,
  });
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
    omit: { file: true },
    orderBy: { createdAt: "asc" },
  });
}
