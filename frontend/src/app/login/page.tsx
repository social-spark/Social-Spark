
"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {main} from "@popperjs/core";
import {Nav} from "@/app/components/Nav";
import React from "react";
import {PostCard} from "@/app/(index)/PostCard";


export default function Login() {
    return (
        <main>
            {/*<Navigation/>*/}
            <Nav/>

    <form className="flex-col gap-4 flex py-60 items-center">
        <div>
        <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>


        </main>
    );
}
