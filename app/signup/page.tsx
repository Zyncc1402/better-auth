import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          const data = await auth.api.signUpEmail({
            body: {
              name,
              email,
              password,
            },
            fetchOptions: {
              onSuccess: () => {
                redirect("/signin");
              },
            },
          });
          console.log("Created User ", data);
        }}
        className={"flex flex-col gap-5 w-[30%]"}
      >
        <Input placeholder="Name" type={"text"} name="name" required />
        <Input placeholder="Email" type={"email"} name="email" required />
        <Input
          placeholder="Password"
          type={"password"}
          name="password"
          required
        />
        <Button type={"submit"}>Sign up</Button>
      </form>
      <h1>
        Already have an account?<Link href="/signin"> Sign in</Link>
      </h1>
    </div>
  );
};

export default Page;
