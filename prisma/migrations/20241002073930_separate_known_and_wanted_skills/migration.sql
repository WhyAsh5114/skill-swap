/*
  Warnings:

  - You are about to drop the `SkillOfUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SkillOfUser" DROP CONSTRAINT "SkillOfUser_skillName_fkey";

-- DropForeignKey
ALTER TABLE "SkillOfUser" DROP CONSTRAINT "SkillOfUser_userId_fkey";

-- DropTable
DROP TABLE "SkillOfUser";

-- CreateTable
CREATE TABLE "KnownSkillOfUser" (
    "skillName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "KnownSkillOfUser_pkey" PRIMARY KEY ("skillName","userId")
);

-- CreateTable
CREATE TABLE "WantedSkillOfUser" (
    "skillName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WantedSkillOfUser_pkey" PRIMARY KEY ("skillName","userId")
);

-- AddForeignKey
ALTER TABLE "KnownSkillOfUser" ADD CONSTRAINT "KnownSkillOfUser_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "Skill"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnownSkillOfUser" ADD CONSTRAINT "KnownSkillOfUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WantedSkillOfUser" ADD CONSTRAINT "WantedSkillOfUser_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "Skill"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WantedSkillOfUser" ADD CONSTRAINT "WantedSkillOfUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
