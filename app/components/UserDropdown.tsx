import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { validateRequest } from "@/lib/auth";
import { User } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { getInitials } from "@/lib/utils";

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
        {user.profilePicture ? (
          <Avatar className="w-8 h-8 rounded-md">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="outline" size="icon">
            <User />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
