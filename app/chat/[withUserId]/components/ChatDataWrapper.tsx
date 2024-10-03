import { validateRequest } from "@/lib/auth";
import ChatWindow from "./ChatWindow";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

type PropsType = { toUserId: string };

export default async function ChatDataWrapper({ toUserId }: PropsType) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user.id, toUserId },
        { toUserId: user.id, fromUserId: toUserId },
      ],
    },
    orderBy: { createdAt: "asc" },
    omit: { file: true },
  });

  return <ChatWindow user={user} toUserId={toUserId} allMessages={messages} />;
}
