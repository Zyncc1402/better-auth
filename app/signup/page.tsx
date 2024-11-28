import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";

const Page = () => {
    return (
        <div className={'h-screen w-full flex items-center justify-center'}>
            <form action={async (formData) => {
                "use server";
                const email = formData.get("email");
                const password = formData.get("password");
                const { data } = await authClient.signIn.email({
                    email: email as string,
                    password: password as string,
                });
                console.log(data)
            }} className={'flex flex-col gap-5 w-[30%]'}>
                <Input placeholder="Email" type={'email'} name="email" required />
                <Input placeholder="Password" type={'password'} name="password" required />
                <Button type={'submit'}>Sign in</Button>
            </form>
        </div>
    );
};

export default Page;