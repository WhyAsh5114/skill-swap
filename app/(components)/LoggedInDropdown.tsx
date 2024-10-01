"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout } from "./logout";
import Link from "next/link";

export function LoggedInDropdown() {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Link href="/profile">Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
