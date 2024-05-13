"use client";

import notify from "@/app/images/notify.png"
import addicon from "@/app/images/addicon.png"
import search from "@/app/images/search.png"
import profile from "@/app/images/profile.png"
import Image from 'next/image'


import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Navigation() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="https://flowbite-react.com">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="#"><Image className="size-7" src={notify} alt="notification icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-7" src={addicon} alt="add prompt icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-7" src={search} alt="search icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-7" src={profile} alt="profile icon"/></Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
