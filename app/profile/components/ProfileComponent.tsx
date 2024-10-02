"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderCircle, User } from "lucide-react";
import { saveProfileChangesAction } from "./actions";
import { toast } from "@/hooks/use-toast";

type PropsType = {
  username: string;
  profilePicture: string;
};

export default function ProfileComponent(data: PropsType) {
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState(data.username);
  const [profilePicture, setProfilePicture] = useState(data.profilePicture);

  async function saveChanges() {
    setSaving(true);
    await saveProfileChangesAction(username, profilePicture);
    setSaving(false);
    toast({ description: "Changes saved successfully" });
  }

  return (
    <div className="grid grid-cols-2 place-items-center gap-y-6">
      <Avatar className="h-16 w-16 items-center justify-center bg-muted">
        {profilePicture === "" ? (
          <User className="h-10 w-10" />
        ) : (
          <AvatarImage src={profilePicture} />
        )}
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      </Avatar>
      <div className="grid w-full items-center gap-1.5 col-span-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Type here"
          minLength={2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5 col-span-2">
        <Label htmlFor="profile-picture">Profile picture</Label>
        <Input
          id="profile-picture"
          placeholder="Paste a link"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
      </div>
      <Button className="col-span-2 ml-auto" onClick={saveChanges}>
        {saving ? <LoaderCircle className="animate-spin" /> : "Save changes"}
      </Button>
    </div>
  );
}
