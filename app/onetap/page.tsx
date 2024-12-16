"use client";

import { oneTap } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    async function GoogleOneTap() {
      await oneTap({
        cancelOnTapOutside: false,
        fetchOptions: {
          onSuccess: () => {
            redirect("/");
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
