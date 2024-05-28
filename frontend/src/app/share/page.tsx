'use client'
import profile from '@/app/images/profile.png'
import Image from "next/image";
import {Post} from "@/app/components/Post";



export default function Share() {
    return (
        <body>
        <div className="flex justify-center items-center h-screen">
            <div className="box-border sm:w-1/4 p-4 border-4 px-10">
                <div className="flex items-center mb-4">
                    <Image className=" w-20 h-20 rounded-full" src={profile} alt="profile picture"/>
                    <div className="ml-4">
                        <p className=" font-bold">User Name</p>
                        <p className=" text-sm text-gray-600">Full Name</p>
                    </div>
                </div>
                <Post/>
                <div className="mt-6 flex items-center justify-end">
                    <button type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Share
                    </button>
                </div>
            </div>
        </div>

        </body>
    );
}
