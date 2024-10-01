"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function saveChangesAction(skillNames: string[]) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const createSkills = prisma.skill.createMany({
    data: skillNames.map((skillName) => ({ name: skillName })),
    skipDuplicates: true,
  });

  const deleteOldSkillsOfUser = prisma.skillOfUser.deleteMany({
    where: { userId: user.id },
  });

  const addSkillsToUser = prisma.skillOfUser.createMany({
    data: skillNames.map((skillName) => ({ userId: user.id, skillName })),
  });

  await prisma.$transaction([
    createSkills,
    deleteOldSkillsOfUser,
    addSkillsToUser,
  ]);
}
