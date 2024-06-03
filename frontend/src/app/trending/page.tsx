"use client";

import {Navigation} from "@/app/components/Navigation";
import {TextInput} from "flowbite-react";
import React from "react";
import {Posts} from "@/app/components/Posts";
import {LeftNav} from "@/app/components/LeftNav";
import profile from "@/app/images/profile.png";
import setting from "@/app/images/settingsicon.png"
import Image from "next/image";


export default function ProfileHeader () {
    return (
        <main className="container mx-auto rounded-lg">
            <Navigation/>

            <section className="grid grid-cols-3 md:grid-cols-3">


                <div className="grid grid-cols-subgrid gap-4 col-span-3">

                    <div className="hidden lg:block">
                        <LeftNav/>
                    </div>


                    <div className="lg:col-start-2 lg:col-span-4 sm:pl-11 col-start-1 col-span-4">
                    <h1 className="font-bold text-3xl ml-36">Prompt</h1>
                        <Posts/>
                    </div>
                </div>
            </section>


        </main>
    )
}