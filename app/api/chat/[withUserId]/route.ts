import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { withUserId: string } }
) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const lastMessageAt = Number(
    request.nextUrl.searchParams.get("lastMessageAt") ?? "0"
  );

  const newMessages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user.id, toUserId: params.withUserId },
        { fromUserId: params.withUserId, toUserId: user.id },
      ],
      createdAt: { gt: new Date(lastMessageAt) },
    },
    orderBy: { createdAt: "asc" },
  });

  return new Response(JSON.stringify(newMessages));
}
