"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    async function GoogleOneTap() {
      await authClient.oneTap({
        fetchOptions: {
          onSuccess: () => {
            redirect("/protected");
          },
        },
      });
    }
    GoogleOneTap();
  });

  return (
    <div className="h-screen w-full flex items-center justify-center text-3xl font-medium">
      Google One Tap Login
    </div>
  );
};

export default Page;
