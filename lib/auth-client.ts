import { createAuthClient } from "better-auth/react";
import { adminClient, oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    oneTapClient({
      clientId:
        "636536358668-i56t1c5ql0e868bem6ebp4cer6spou8f.apps.googleusercontent.com",
    }),
    adminClient(),
  ],
});
