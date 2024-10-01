import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SkillsComponent } from "./SkillsComponent";
import prisma from "@/lib/db";

export async function SkillsDataWrapper() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const skillsOfUser = await prisma.skillOfUser.findMany({
    where: { userId: user.id },
  });

  return <SkillsComponent skillsOfUser={skillsOfUser} />;
}
