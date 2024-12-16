import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";
import SignUpForm from "./SignUpForm";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <div
      className={
        "h-screen w-full flex items-center justify-center flex-col gap-y-5"
      }
    >
      <SignUpForm />
      <h1>
        Already have an account?<Link href="/signin"> Sign in</Link>
      </h1>
    </div>
  );
};

export default Page;
