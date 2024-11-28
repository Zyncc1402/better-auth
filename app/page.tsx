import React from "react";
import { headers } from "next/headers";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="h-screen w-full flex items-center justify-center font-medium text-xl">
        {session ? <h1>{session.user.email}</h1> : <h1>Not logged in</h1>}
    </div>
  );
}
