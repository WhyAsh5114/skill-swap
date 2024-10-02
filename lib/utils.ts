import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(username: string) {
  return username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}
