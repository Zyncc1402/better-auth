import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export default async function Admin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role != "admin") {
    return notFound();
  }
  return (
    <div className="container mx-auto pt-[100px]">
      <h1 className="text-2xl font-medium">Role: {session?.user.role}</h1>
    </div>
  );
}
