"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function sendConnectionRequest(toUserId: string) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      connections: { where: { id: toUserId } },
      sentRequests: { where: { toUserId } },
    },
  });

  if (userData?.connections.length) {
    return "Already a connection";
  }
  if (userData?.sentRequests.length) {
    return "Already sent a request";
  }

  await prisma.connectionRequest.create({
    data: { fromUserId: user.id, toUserId },
  });
}
