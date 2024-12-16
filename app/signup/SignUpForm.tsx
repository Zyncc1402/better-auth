"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <form
        action={async (formData) => {
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          await signUp.email({
            name,
            email,
            password,
            callbackURL: "/dashboard",
            fetchOptions: {
              onResponse: () => {
                setLoading(false);
              },
              onRequest: () => {
                setLoading(true);
              },
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: async () => {
                router.push("/dashboard");
              },
            },
          });
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
        <Button type={"submit"}>
          {loading ? <LuLoaderCircle className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
      <div className="w-[30%] flex flex-col gap-y-3">
        <form
          action={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
              fetchOptions: {
                onError: (ctx) => {
                  toast.error(ctx.error.message);
                },
                onSuccess: async () => {
                  toast.success("Logged In");
                },
              },
            });
          }}
        >
          <Button type="submit" className="w-full" variant={"secondary"}>
            Sign up with Google
          </Button>
        </form>
        <form
          action={async () => {
            await signIn.social({
              provider: "github",
              callbackURL: "/dashboard",
              fetchOptions: {
                onError: (ctx) => {
                  toast.error(ctx.error.message);
                },
                onSuccess: async () => {
                  toast.success("Logged In");
                },
              },
            });
          }}
        >
          <Button type="submit" className="w-full" variant={"secondary"}>
            Sign up with Github
          </Button>
        </form>
      </div>
    </>
  );
}
