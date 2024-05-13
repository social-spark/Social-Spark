'use client'
import React from "react";
import {main} from "@popperjs/core";
import {Navigation} from "@/app/components/Navigation";
import {Login} from "@/app/Login";

export default function Home() {
    return (

        <main>
            <Navigation/>
            <Login/>
        </main>
    )
}