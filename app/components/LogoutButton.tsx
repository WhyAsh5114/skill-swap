"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "./logout";

export function LogoutButton() {
  return (
    <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
      Log out
    </DropdownMenuItem>
  );
}
