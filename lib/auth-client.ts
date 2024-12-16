import { createAuthClient } from "better-auth/react";
import { adminClient, oneTapClient } from "better-auth/client/plugins";

export const { useSession, signIn, signUp, signOut, oneTap } = createAuthClient(
  {
    baseURL:
      process.env.NODE_ENV == "development"
        ? "http://localhost:3000"
        : "https://better-auth-zync.vercel.app/",
    plugins: [
      oneTapClient({
        clientId:
          "636536358668-i56t1c5ql0e868bem6ebp4cer6spou8f.apps.googleusercontent.com",
      }),
      adminClient(),
    ],
  }
);
