"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Githubbtn() {
  return (
    <Button
      type="submit"
      className="w-full"
      variant={"secondary"}
      onClick={async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/protected",
        });
      }}
    >
      Sign in with Github
    </Button>
  );
}
