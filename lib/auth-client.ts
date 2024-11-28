import { createAuthClient } from "better-auth/client";
import { oneTapClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  plugins: [
    nextCookies(),
    oneTapClient({
      clientId:
        "636536358668-i56t1c5ql0e868bem6ebp4cer6spou8f.apps.googleusercontent.com",
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
