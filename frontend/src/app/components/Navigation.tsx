"use client";

import notify from "@/app/images/notify.png"
import addicon from "@/app/images/addicon.png"
import search from "@/app/images/search.png"
import profile from "@/app/images/profile.png"
import promptMeLogo from "@/app/images/promptMeLogo.png"
import Image from 'next/image'


import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Navigation() {
    return (
        <Navbar className="bg-white rounded-lg border border-slate-950">
              <Navbar.Brand as={Link} href="#"><Image className="size-20" src={promptMeLogo} alt="placeholder logo"/></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link href="#"><Image className="size-10 hover:bg-[#42AEEE] rounded-full " src={notify} alt="notification icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-10 hover:bg-[#42AEEE] rounded-full" src={addicon} alt="add prompt icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-10 hover:bg-[#42AEEE] rounded-full" src={search} alt="search icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-10 hover:bg-[#42AEEE] rounded-full" src={profile} alt="profile icon"/></Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
