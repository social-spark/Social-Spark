'use client'
import notify from "@/app/images/notify.png"
import addicon from "@/app/images/addicon.png"
import search from "@/app/images/search.png"
import profile from "@/app/images/profile.png"
import promptMeLogo from "@/app/images/promptMeLogo.png"
import Image from 'next/image'
import {getSession} from "@/utils/fetchSession";
import {Navbar} from "flowbite-react";
import Link from "next/link";
import {useState} from "react";
import {PromptBox} from "@/app/components/PromptBox";
import {fetchAllPrompts, Prompt} from "@/utils/models/prompt.model";

type NavigationProps = {
    session: any
    prompts: Prompt[]
}

export function Navigation(props: NavigationProps) {
  const {session, prompts} = props
    const [openModal, setOpenModal] = useState(true);
    return (
        <Navbar className="bg-white rounded-lg border border-slate-950">
              <Navbar.Brand  href="#"><Image className="size-20" src={promptMeLogo} alt="placeholder logo"/></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                {session && (
                    <>
                    <Navbar.Link href="#"><Image className="size-7" src={notify} alt="notification icon"/></Navbar.Link>
                    {/*<Navbar.Link href="#">*/}
                        <button onClick={() => setOpenModal(true)}>
                        <Image className="size-7" src={addicon} alt="add prompt icon"/>
                        </button>
                        <PromptBox openModal={openModal} setOpenModal={setOpenModal} prompts={prompts} />
                    {/*</Navbar.Link>*/}
                    </>
                )}
                <Navbar.Link href="#"><Image className="size-7" src={search} alt="search icon"/></Navbar.Link>
                {session && (
                    <>
                        <Navbar.Link href={`/profile/${session.profile.profileUsername}`}><Image className="size-7" src={profile} alt="profile icon"/></Navbar.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
