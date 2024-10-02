import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SkillsComponent } from "./SkillsComponent";
import prisma from "@/lib/db";

export async function SkillsDataWrapper() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const knownSkillsOfUser = await prisma.knownSkillOfUser.findMany({
    where: { userId: user.id },
  });

  return <SkillsComponent knownSkillsOfUser={knownSkillsOfUser} />;
}
