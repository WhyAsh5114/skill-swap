"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export async function SkillsComponent() {
  const [skills, setSkills] = useState<string[]>(["React", "Python"]);

  return (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill) => (
        <Badge key={skill}>{skill}</Badge>
      ))}
    </div>
  );
}
