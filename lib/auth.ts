import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { unstable_cache } from "next/cache";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      profilePicture: attributes.profilePicture,
      about: attributes.about,
    };
  },
});

type ValidateRequestReturnType = Promise<
  { user: User; session: Session } | { user: null; session: null }
>;

export const validateRequestWithCookie = unstable_cache(
  async (sessionCookie?: RequestCookie): ValidateRequestReturnType => {
    const sessionId = sessionCookie?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  },
  [],
  {
    tags: ["user"],
  }
);

export const validateRequest = () =>
  validateRequestWithCookie(cookies().get(lucia.sessionCookieName));

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  profilePicture?: string;
  about?: string;
}
