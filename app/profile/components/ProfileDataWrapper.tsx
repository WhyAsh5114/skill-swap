import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileComponent from "./ProfileComponent";

export default async function ProfileDataWrapper() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <ProfileComponent
      username={user.username}
      profilePicture={user.profilePicture ?? ""}
      about={user.about ?? ""}
    />
  );
}
