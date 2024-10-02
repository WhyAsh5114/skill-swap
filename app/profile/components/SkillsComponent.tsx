"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { KnownSkillOfUser, WantedSkillOfUser } from "@prisma/client";
import { saveSkillsChangesAction } from "./actions";
import { toast } from "@/hooks/use-toast";

type PropsType = {
  knownSkillsOfUser: KnownSkillOfUser[];
  wantedSkillsOfUser: WantedSkillOfUser[];
};

export function SkillsComponent({
  knownSkillsOfUser,
  wantedSkillsOfUser,
}: PropsType) {
  const [saving, setSaving] = useState(false);

  const [skillToAdd, setSkillToAdd] = useState("");
  const [knownSkills, setKnownSkills] = useState<string[]>(
    knownSkillsOfUser.map(({ skillName }) => skillName)
  );
  const [wantedSkills, setWantedSkills] = useState<string[]>(
    wantedSkillsOfUser.map(({ skillName }) => skillName)
  );

  function addSkill(skillType: "known" | "wanted") {
    const skill = skillToAdd;
    setSkillToAdd("");
    if (wantedSkills.concat(knownSkills).includes(skill)) return;

    if (skillType === "known") {
      setKnownSkills([...knownSkills, skill]);
    } else {
      setWantedSkills([...wantedSkills, skill]);
    }
  }

  function removeSkill(skill: string, skillType: "known" | "wanted") {
    if (skillType === "known") {
      setKnownSkills(knownSkills.filter((_skill) => _skill !== skill));
    } else {
      setWantedSkills(wantedSkills.filter((_skill) => _skill !== skill));
    }
  }

  async function saveChanges() {
    setSaving(true);
    await saveSkillsChangesAction(knownSkills, wantedSkills);
    setSaving(false);
    toast({ description: "Changes saved successfully" });
  }

  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="skill-name">Add skills</Label>
        <Input
          id="skill-name"
          value={skillToAdd}
          onChange={(e) => setSkillToAdd(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Button
          variant="secondary"
          className="gap-2"
          onClick={() => addSkill("known")}
        >
          Known
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          className="gap-2"
          onClick={() => addSkill("wanted")}
        >
          Wanted
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center mt-4">
        <span className="font-medium text-sm">Known skills</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {knownSkills.map((skill) => (
          <Badge
            className="flex items-center justify-between gap-1"
            key={skill}
          >
            {skill}
            <Button
              className="w-4 h-4 p-0"
              variant="ghost"
              onClick={() => removeSkill(skill, "known")}
            >
              <X />
            </Button>
          </Badge>
        ))}
        {knownSkills.length === 0 ? (
          <Badge variant="outline">None</Badge>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center mt-4">
        <span className="font-medium text-sm">Wanted skills</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {wantedSkills.map((skill) => (
          <Badge
            className="flex items-center justify-between gap-1"
            key={skill}
          >
            {skill}
            <Button
              className="w-4 h-4 p-0"
              variant="ghost"
              onClick={() => removeSkill(skill, "wanted")}
            >
              <X />
            </Button>
          </Badge>
        ))}
        {wantedSkills.length === 0 ? (
          <Badge variant="outline">None</Badge>
        ) : (
          <></>
        )}
      </div>
      <Button className="ml-auto mt-6" onClick={saveChanges} disabled={saving}>
        {saving ? <LoaderCircle className="animate-spin" /> : "Save changes"}
      </Button>
    </>
  );
}
