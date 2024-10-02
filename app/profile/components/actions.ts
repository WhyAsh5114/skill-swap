"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function saveSkillsChangesAction(skillNames: string[]) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const createSkills = prisma.skill.createMany({
    data: skillNames.map((skillName) => ({ name: skillName })),
    skipDuplicates: true,
  });

  const deleteOldSkillsOfUser = prisma.knownSkillOfUser.deleteMany({
    where: { userId: user.id },
  });

  const addSkillsToUser = prisma.knownSkillOfUser.createMany({
    data: skillNames.map((skillName) => ({ userId: user.id, skillName })),
  });

  await prisma.$transaction([
    createSkills,
    deleteOldSkillsOfUser,
    addSkillsToUser,
  ]);
}

export async function saveProfileChangesAction(
  username: string,
  profilePicture: string
) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  await prisma.user.update({
    where: { id: user.id },
    data: { username, profilePicture },
  });
}
