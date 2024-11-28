import React from 'react';
import {auth} from "@/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Protected = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        redirect('/signin')
    }
    return (
        <div>
            <h1 className={'text-2xl font-medium'}>This is a protected page</h1>
        </div>
    );
};

export default Protected;