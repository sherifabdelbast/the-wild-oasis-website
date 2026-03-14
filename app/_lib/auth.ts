import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { headers } from "next/headers";
import { createGuest, getGuest } from "./data-service";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
  after: [
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      matcher: (ctx: any) => ctx.path === "/sign-in/social",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async (ctx: any) => {
        const email = ctx.context?.session?.user?.email;
        if (email) {
          const existingGuest = await getGuest(email);
          if (!existingGuest) {
            await createGuest({
              email,
              fullName: ctx.context?.session?.user?.name ?? "",
            });
          }
        }
      },
    },
  ],
});

// Enriches the session with guestId from the guests table
export async function getAuthSession() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (!session) return null;

  const guest = await getGuest(session.user.email);
  return {
    ...session,
    user: { ...session.user, guestId: guest?.id },
  };
}
