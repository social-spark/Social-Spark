
"use client";

import {Nav} from "@/app/components/Nav";
import React from "react";
import {SignInForm} from "@/app/sign-in/SignInForm";
import {SignUpForm} from "@/app/sign-in/SignUpForm";


export default function () {
    return (
        <main>
            <Nav/>
            <SignInForm/>
        </main>
    );
}
