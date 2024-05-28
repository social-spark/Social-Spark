import notify from "@/app/images/notify.png";
import addicon from "@/app/images/addicon.png";
import search from "@/app/images/search.png";
import profile from "@/app/images/profile.png";
import iconlogo from "@/app/images/iconlogo.png";
import Image from 'next/image';

import { useState } from 'react';
import { OpenModal } from "flowbite-react";
import { Button, Navbar } from "flowbite-react";
import {PromptBox} from "@/app/components/PromptBox";
import Modal from "@/app/components/Modal";


export function Navigation() {
    // Define state for openModal and setOpenModal
    const [openModal, setOpenModal] = useState(false);

    return (
        <Navbar>
            <Navbar.Brand href="#"><Image className="size-10" src={iconlogo} alt="placeholder logo"/></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link href="#"><Image className="size-7" src={notify} alt="notification icon"/></Navbar.Link>
                <Button onClick={() => setOpenModal(true)}>
                    <Navbar.Link>
                        <Image className="size-7" src={addicon} alt="add prompt icon"/>
                    </Navbar.Link>
                </Button>
                <Navbar.Link href="#"><Image className="size-7" src={search} alt="search icon"/></Navbar.Link>
                <Navbar.Link href="#"><Image className="size-7" src={profile} alt="profile icon"/></Navbar.Link>
            </Navbar.Collapse>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <PromptBox/>
            </Modal>
        </Navbar>

    );
}




// "use client";
//
// import notify from "@/app/images/notify.png"
// import addicon from "@/app/images/addicon.png"
// import search from "@/app/images/search.png"
// import profile from "@/app/images/profile.png"
// import iconlogo from "@/app/images/iconlogo.png"
// import Image from 'next/image'
//
// import {OpenModal} from "flowbite-react";
// import Link from "next/link";
// import {Button, Navbar} from "flowbite-react";
//
// export function Navigation() {
//     return (
//         <Navbar>
//               <Navbar.Brand as={Link} href="#"><Image className="size-10" src={iconlogo} alt="placeholder logo"/></Navbar.Brand>
//             <Navbar.Toggle/>
//             <Navbar.Collapse>
//                 <Navbar.Link href="#"><Image className="size-7" src={notify} alt="notification icon"/></Navbar.Link>
//                 <Button onClick={() => setOpenModal(true)}><Navbar.Link><Image className="size-7" src={addicon} alt="add prompt icon"/></Navbar.Link></Button>
//                 <Navbar.Link href="#"><Image className="size-7" src={search} alt="search icon"/></Navbar.Link>
//                 <Navbar.Link href="#"><Image className="size-7" src={profile} alt="profile icon"/></Navbar.Link>
//             </Navbar.Collapse>
//         </Navbar>
//     );
// }
