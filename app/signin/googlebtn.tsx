"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Googlebtn() {
  return (
    <Button
      type="submit"
      className="w-full"
      variant={"secondary"}
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/protected",
        });
      }}
    >
      Sign in with Google
    </Button>
  );
}
