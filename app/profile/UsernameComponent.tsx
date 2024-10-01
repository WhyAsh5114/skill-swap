import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export async function UsernameComponent() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return <p className="mt-2">Hi, {user.username}!</p>;
}
