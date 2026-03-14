import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
});

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};


export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};
