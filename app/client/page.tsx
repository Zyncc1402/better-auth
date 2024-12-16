"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthButtons() {
  const { data: session } = useSession();
  return (
    <div className="h-screen gap-5 w-full flex items-center justify-center font-medium text-xl">
      {session ? (
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">ID: {session.user.id}</h1>
          <h1 className="text-2xl font-medium">Name: {session.user.name}</h1>
          <h1 className="text-2xl font-medium">Email: {session.user.email}</h1>
          <h1 className="text-2xl font-medium">
            Token: {session.session.token}
          </h1>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
      {session?.user.image && (
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
}
