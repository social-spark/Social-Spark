"use client";

import {Navigation} from "@/app/components/Navigation";
import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import React from "react";
import {Posts} from "@/app/components/Posts";
import {LeftNav} from "@/app/components/LeftNav";

export default function ProfileHeader () {
    return (
        <main>
            <Navigation/>
            <LeftNav/>
            <Posts/>


        </main>
    )
}