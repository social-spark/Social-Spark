'use client'

import {Nav} from "@/app/components/Nav";
import {Button, TextInput} from "flowbite-react";
import React from "react";


export default function SignUpForm() {
    return (
        <main>
            <Nav/>
            <form className="flex-col gap-4  py-20 w-1/2 flex items-center bg-auto container  md: mx-auto bg-slate-400 md:mt-16 md:rounded-lg">
                <div>

                    <TextInput id="First-Name" type="First Name" placeholder="First Name" required/>
                </div>
                <div>
                    <TextInput id="Last-Name" type="Last Name" placeholder="Last Name" required/>
                </div>
                <div>
                    <TextInput id="User-Name" type="User Name" placeholder="User Name" required/>
                </div>
                <div>
                    <TextInput id="Email" type="Email" placeholder="name@example.com" required/>
                </div>
                <div>
                    <TextInput id="Password" type="Password" placeholder="Password" required/>
                </div>
                <div>
                    <TextInput id="Re-enter-Password" type="Password" placeholder="Re-enter Password" required/>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </main>
    );
}
