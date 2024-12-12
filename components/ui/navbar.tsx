import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { headers } from "next/headers";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header
      className={
        "w-full absolute top-0 left-0 right-0 flex justify-between py-3 container mx-auto"
      }
    >
      <Link href="/">
        <h1 className={"text-xl font-semibold"}>better auth</h1>
      </Link>
      <div className={"flex gap-x-10 items-center"}>
        <Link href="/onetap">Google</Link>
        <Link href="/server">Server</Link>
        <Link href="/client">Client</Link>
        <Link href="/admin">Admin</Link>
        {session ? (
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
            }}
          >
            <Button type={"submit"} variant={"secondary"}>
              Sign out
            </Button>
          </form>
        ) : (
          <Link href="/signin">
            <Button variant={"secondary"} type={"button"}>
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
