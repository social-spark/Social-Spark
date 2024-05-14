"use client";
import iconlogo from "@/app/images/iconlogo.png"
import Image from 'next/image'



import Link from "next/link";
import { Navbar } from "flowbite-react";

export function Nav() {
    return (
        <Navbar>
            <Navbar.Brand as={Link} href="#"><Image className="size-10" src={iconlogo} alt="placeholder logo"/></Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar>
    );
}