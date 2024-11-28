import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import Googlebtn from "./googlebtn";
import Githubbtn from "./githubbtn";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

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
      <form
        action={async (formData) => {
          "use server";
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          try {
            await auth.api.signInEmail({
              body: {
                email,
                password,
              },
            });
          } catch (error) {
            if (error instanceof APIError) {
              console.log(error.message, error.status)
            }
          }
        }}
        className={"flex flex-col gap-5 w-[30%]"}
      >
        <Input placeholder="Email" type={"email"} name="email" required />
        <Input
          placeholder="Password"
          type={"password"}
          name="password"
          required
        />
        <Button type={"submit"}>Sign in</Button>
      </form>
      <div className="w-[30%] flex flex-col gap-y-3">
        <Googlebtn />
        <Githubbtn />
      </div>
      <h1>
        Dont have an account?<Link href="/signup"> Sign up</Link>
      </h1>
    </div>
  );
};

export default Page;
