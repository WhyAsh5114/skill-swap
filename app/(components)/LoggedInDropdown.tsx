"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout } from "./logout";

export function LoggedInDropdown() {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
