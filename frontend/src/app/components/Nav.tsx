"use client";
import promptMeLogo from "@/app/images/promptMeLogo.png"
import Image from 'next/image'



import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Nav() {
    return (
        <Navbar>
            <Navbar.Brand as={Link} href="#"><Image className="size-16" src={promptMeLogo} alt="placeholder logo"/></Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar>
    );
}