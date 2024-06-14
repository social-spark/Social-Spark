'use client'

import {Navigation} from "@/app/components/Navigation";

import React from "react";
import Image from "next/image";
import cardTopImage from "@/app/images/card-top.jpg";
import {Page} from "@/app/create-post/page";

export default function ProfileHeader () {
    return (
        <main>
            <Navigation/>
            <Page/>

            <div
                className="container border-solid bg-white border-2 border-black grid grid-cols-2 gap-5 mx-auto sm:max-w-4xl max-w-sm rounded shadow-lg p-10 mt-5 mb-10">

                <Image className="w-full" src={cardTopImage} alt="Sunset in the mountains"/>
                <div className="flex items-center justify-center">

                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/>
                        </svg>
                        <span>Upload photo</span>
                    </button>

                </div>
            </div>

            <div className="flex items-center justify-center my-7">
                <div className="relative mt-2 rounded-md">
                    <label>Username</label>
                    <input type="text" name="Username" id="Username"
                           className="block w-full rounded-md shadow-lg border-0 py-1.5 pr-28 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div className="flex items-center justify-center my-7">
                <div className="relative mt-2 rounded-md">
                    <label>First Name</label>
                    <input type="text" name="Full Name" id="Full Name"
                           className="block w-full rounded-md shadow-lg border-0 py-1.5 pr-28 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div className="flex items-center justify-center my-7">
                <div className="relative mt-2 rounded-md">
                    <label>Bio</label>
                    <input type="text" name="Bio" id="Bio"
                           className="block w-full rounded-md shadow-lg border-0 sm:pr-60 sm:pb-28 pr-40 pb-14 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Bio"/>
                </div>
            </div>


        </main>
    )
}