"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SkillOfUser } from "@prisma/client";

type PropsType = { skillsOfUser: SkillOfUser[] };

export function SkillsComponent({ skillsOfUser }: PropsType) {
  const [skillToAdd, setSkillToAdd] = useState("");
  const [skills, setSkills] = useState<string[]>(
    skillsOfUser.map(({ skillName }) => skillName)
  );

  function addSkill() {
    const skill = skillToAdd;
    setSkillToAdd("");
    if (skills.includes(skill)) {
      return false;
    }
    setSkills([...skills, skill]);
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((_skill) => _skill !== skill));
  }

  return (
    <>
      <div className="flex items-end gap-1">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="skill-name">Search skills</Label>
          <Input
            id="skill-name"
            value={skillToAdd}
            onChange={(e) => setSkillToAdd(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="gap-2" onClick={addSkill}>
          Add
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills.map((skill) => (
          <Badge
            className="flex items-center justify-between gap-1"
            key={skill}
          >
            {skill}
            <Button
              className="w-4 h-4 p-0"
              variant="ghost"
              onClick={() => removeSkill(skill)}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
}
