'use client'
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import postimage from "@/app/images/image-4.jpg";
import Image from "next/image";
import profileImage from "@/app/images/profile.png";
import UploadImage from "@/app/images/UploadImage.jpg";

export default function Page() {

    return (
        <>

            <form>
                <div className="max-w-screen-lg rounded overflow-hidden bg-white mx-auto shadow-lg my-10 pb-5 border border-slate-950">
                    <Image className="w-full" src={UploadImage} alt="Sunset in the mountains"/>
                    <div className="px-6 py-4">
                        <Image className="mr-2 w-10 h-10 rounded-full inline-flex" src={profileImage}
                               alt="profile image"/>
                        <div className="font-bold mb-2 inline-flex">user_name</div>
                        <br/>
                        <div className="font-bold py-5 mb-2 inline-flex">#prompt</div>
                        <p className="inline-flex pl-5 items-center mr-3 text-sm font-bold mb-2">Prompt Body</p>
                        <p className="text-gray-500 dark:text-gray-400">Post Body flkkaklrjaklrjklajrklajr
                            jklajrlajrkjarlkjaklrjrklajrkljalkrjlkajrklajrkljaklrjaklrjklajrklajrkljaklrjakljrklj
                            kajrkljaklrjklarjklajrkljarkjaklrjklajrklj3riowuioqrjopqariopqiepioptiewopughslnkljja
                            jklajrlajrkjarlkjaklrjrklajrkljalkrjlkajrklajrkljaklrjaklrjklajrklajrkljaklrjakljrklj
                            kajrkljaklrjklarjklajrkljarkjaklrjklajrklj3riowuioqrjopqariopqiepioptiewopughslnkljja</p>
                        <Button className='mx-5 float-right' color={'failure'} type={'reset'}>Cancel</Button>
                        <Button className='mx-5 float-right' color={'success'} type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </>
    );
}