import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";

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
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          const data = await auth.api.signUpEmail({
            body: {
              name,
              email,
              password,
            },
            asResponse: true,
          });
          if (data.status == 200) {
            redirect("/");
          }
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
      <div className="w-[30%] flex flex-col gap-y-3">
        <form
          action={async () => {
            "use server";
            const res = await auth.api.signInSocial({
              body: {
                provider: "google",
                fetchOptions: {
                  onSuccess: () => redirect("/"),
                },
              },
            });
            redirect(res.url);
          }}
        >
          <Button type="submit" className="w-full" variant={"secondary"}>
            Sign up with Google
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            const res = await auth.api.signInSocial({
              body: {
                provider: "github",
                fetchOptions: {
                  onSuccess: () => redirect("/"),
                },
              },
            });
            redirect(res.url);
          }}
        >
          <Button type="submit" className="w-full" variant={"secondary"}>
            Sign up with Github
          </Button>
        </form>
      </div>
      <h1>
        Already have an account?<Link href="/signin"> Sign in</Link>
      </h1>
    </div>
  );
};

export default Page;
