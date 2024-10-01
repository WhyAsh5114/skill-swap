import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return <h1>Hi, {user.username}!</h1>;
}
