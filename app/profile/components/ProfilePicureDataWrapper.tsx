import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfilePictureComponent from "./ProfilePictureComponent";

export async function ProfilePictureDataWrapper() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <ProfilePictureComponent
      username={user.username}
      profilePicture={user.profilePicture ?? ""}
    />
  );
}
