"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { KnownSkillOfUser } from "@prisma/client";
import { saveSkillsChangesAction } from "./actions";
import { toast } from "@/hooks/use-toast";

type PropsType = { knownSkillsOfUser: KnownSkillOfUser[] };

export function SkillsComponent({ knownSkillsOfUser }: PropsType) {
  const [saving, setSaving] = useState(false);

  const [skillToAdd, setSkillToAdd] = useState("");
  const [skills, setSkills] = useState<string[]>(
    knownSkillsOfUser.map(({ skillName }) => skillName)
  );

  function addSkill() {
    const skill = skillToAdd;
    setSkillToAdd("");
    if (skills.includes(skill)) return false;
    setSkills([...skills, skill]);
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((_skill) => _skill !== skill));
  }

  async function saveChanges() {
    setSaving(true);
    await saveSkillsChangesAction(skills);
    setSaving(false);
    toast({ description: "Changes saved successfully" });
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
      <Button className="ml-auto mt-6" onClick={saveChanges}>
        {saving ? <LoaderCircle className="animate-spin" /> : "Save changes"}
      </Button>
    </>
  );
}
