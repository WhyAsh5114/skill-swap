import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import ConnectionsComponent from "./ConnectionsComponent";
import prisma from "@/lib/db";

export default async function ConnectionsDataWrapper() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  const userData = (await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      connections: true,
      connectionOf: true,
      receivedRequests: { include: { fromUser: true } },
      sentRequests: { include: { toUser: true } },
    },
  }))!;

  return <ConnectionsComponent userData={userData} />;
}
