"use server";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(255),
});

export async function signup(values: z.infer<typeof formSchema>) {
  const { username, password } = values;

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);

  try {
    await prisma.user.create({
      data: { id: userId, username: username, password_hash: passwordHash },
    });
  } catch (error) {
    throw new Error("Username already exists");
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
