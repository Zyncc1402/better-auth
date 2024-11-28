import React from "react";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

const Protected = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="container mx-auto pt-[100px]">
      <h1 className={"text-2xl font-medium"}>This is a protected page</h1>
      <h1 className="text-2xl font-medium">Name: {session.user.name}</h1>
      <h1 className="text-2xl font-medium">Email: {session.user.email}</h1>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="profile picture"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default Protected;
