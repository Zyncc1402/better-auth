import { auth } from "@/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    redirect("/signin");
  }
  return (
    <div className="container mx-auto mt-[100px]">
      Dashboard
      <h1>{session.user.name}</h1>
      <h1>{session.user.email}</h1>
      <h1>{session.user.role}</h1>
      {session.user.image && (
        <Image
          src={session.user.image}
          width={200}
          height={200}
          className="rounded-full"
          alt="profile picture"
        />
      )}
    </div>
  );
}
