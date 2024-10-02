"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function saveSkillsChangesAction(
  knownSkillNames: string[],
  wantedSkillNames: string[]
) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const createSkills = prisma.skill.createMany({
    data: knownSkillNames
      .concat(wantedSkillNames)
      .map((skillName) => ({ name: skillName })),
    skipDuplicates: true,
  });

  const deleteOldKnownSkillsOfUser = prisma.knownSkillOfUser.deleteMany({
    where: { userId: user.id },
  });

  const deleteOldWantedSkillsOfUser = prisma.wantedSkillOfUser.deleteMany({
    where: { userId: user.id },
  });

  const addKnownSkillsToUser = prisma.knownSkillOfUser.createMany({
    data: knownSkillNames.map((skillName) => ({ userId: user.id, skillName })),
  });

  const addWantedSkillsToUser = prisma.wantedSkillOfUser.createMany({
    data: wantedSkillNames.map((skillName) => ({ userId: user.id, skillName })),
  });

  await prisma.$transaction([
    createSkills,
    deleteOldKnownSkillsOfUser,
    deleteOldWantedSkillsOfUser,
    addKnownSkillsToUser,
    addWantedSkillsToUser,
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
