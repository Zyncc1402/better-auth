import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleBtn from "./googlebtn";
import { auth } from "@/auth";
import GithubBtn from "./githubbtn";

const Page = () => {
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
          const data = await auth.api.signInEmail({
            body: {
              email,
              password,
            },
          });
          console.log("Signed in User ", data);
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
      <GoogleBtn />
      <GithubBtn />
      <h1>
        Dont have an account?<Link href="/signup"> Sign up</Link>
      </h1>
    </div>
  );
};

export default Page;
