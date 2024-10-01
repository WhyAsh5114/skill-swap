"use server";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { formSchema } from "./schema";

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

export async function login(values: z.infer<typeof formSchema>) {
  const { username, password } = values;

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (!existingUser) {
    throw new Error("Incorrect username or password");
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    throw new Error("Incorrect username or password");
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
