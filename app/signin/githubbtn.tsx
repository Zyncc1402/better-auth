"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function GithubBtn() {
  return (
    <Button
      type="submit"
      variant={"secondary"}
      onClick={async () => {
        await authClient.signIn.social({
          provider: "github",
        });
      }}
    >
      Sign in with Github
    </Button>
  );
}
