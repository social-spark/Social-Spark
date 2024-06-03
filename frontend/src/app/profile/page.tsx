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
                    <section className="container border border-slate-950 col-start-1 col-span-3">

                        <div className="grid md:grid-cols-4 grid-cols-3">
                            <Image className="object-scale-down h-36 w-36 p-5" src={profile} alt="Sunset in the mountains"/>

                            <div className="col-start-2">
                                <p className="py-1">@UserName</p>
                                <p className="py-1">Full Name</p>
                                <TextInput id="Bio" type="Bio" placeholder="Bio" className="py-3"/>
                            </div>

                            <div
                                className="md:col-start-4 col-start-3 md:flex md:flex-row flex flex-col flex-wrap place-content-evenlynp">
                                <button type="button"
                                        className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Follow
                                </button>
                                <button className="w-30 mx-auto">
                                    <Image className="" width={30}
                                           height={30} src={setting} alt="setting icon"/>
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="hidden lg:block">
                        <LeftNav/>
                    </div>


                    <div className="lg:col-start-2 lg:col-span-4 sm:pl-11 col-start-1 col-span-4">
                        <Posts/>
                    </div>
                </div>
            </section>


        </main>
    )
}