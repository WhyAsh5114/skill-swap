import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateRequest } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { LoggedInDropdown } from "./LoggedInDropdown";
import Link from "next/link";

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
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="profile picture"
          />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <LoggedInDropdown />
    </DropdownMenu>
  );
}
