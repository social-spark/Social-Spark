"use client";
import trending from "@/app/images/trending.png"
import friends from "@/app/images/friends.png"
import {Navbar, Sidebar} from "flowbite-react";
import Image from "next/image";

export function LeftNav() {
    return (
        <Sidebar aria-label="Sidebar with content separator example">

            <Sidebar.Items>
                <Sidebar.ItemGroup className="text-center">
                    <Sidebar.Item href="#"><Image className="size-7 inline-flex tracking-normal" src={friends} alt="friends icon"/>
                        Prompt Friends
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Following:
                        <div className="underline decoration-blue-400 text-center">username</div>
                        <div className="underline decoration-blue-400 text-center">username</div>
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Followers:
                        <div className="underline decoration-blue-400 text-center">username</div>
                        <div className="underline decoration-blue-400 text-center">username</div>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="text-center">
                    <Sidebar.Item href="#"><p className="inline-flex">Trending</p>
                        <Image className="size-7 float-right" src={trending} alt="trending prompts icon"/>
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        #Art&Culture
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        #Foodie
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        #Sports
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
