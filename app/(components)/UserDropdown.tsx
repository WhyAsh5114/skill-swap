import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateRequest } from "@/lib/auth";
import { User } from "lucide-react";
import Link from "next/link";
import { LoggedInDropdown } from "./LoggedInDropdown";

export default async function UserDropdown() {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <LoggedInDropdown />
    </DropdownMenu>
  );
}
