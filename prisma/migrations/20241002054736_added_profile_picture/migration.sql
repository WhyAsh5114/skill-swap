-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT;

-- CreateTable
CREATE TABLE "Skill" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "SkillOfUser" (
    "skillName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SkillOfUser_pkey" PRIMARY KEY ("skillName","userId")
);

-- AddForeignKey
ALTER TABLE "SkillOfUser" ADD CONSTRAINT "SkillOfUser_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "Skill"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillOfUser" ADD CONSTRAINT "SkillOfUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
