"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      type={"submit"}
      variant={"secondary"}
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        });
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
