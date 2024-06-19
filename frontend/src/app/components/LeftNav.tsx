"use client";
import trending from "@/app/images/trending.png"
import friends from "@/app/images/friends.png"
import {Sidebar} from "flowbite-react";
import Image from "next/image";
import React from "react";
import {FollowUsername} from "@/app/components/FollowUsername";
import {Profile} from "@/utils/models/profile.model";


type Props = {
    followers: Profile[]
    followings: Profile[]
}


export function LeftNav(props: Props) {
    const {followers, followings} = props
    return (
        <Sidebar aria-label="Sidebar with content separator example" className="sticky top-0 h-screen border bg-amber-400">
            <Sidebar.Items className={""}>
                <Sidebar.ItemGroup className="text-center">
                    <Sidebar.Item href="#"><Image className=" size-7 inline-flex tracking-normal" src={friends} alt="friends icon"/>
                        Prompt Friends
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Following: {followings.length}
                        {followings.slice(0, 2).map(profile =>
                        <div key={`1-${profile.profileId}`} className="underline decoration-blue-400 text-center">{profile.profileUsername}</div>)}


                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Followers: {followers.length}
                        {followers.slice(0, 2).map(profile =>
                            <div key={`2-${profile.profileId}`} className="underline decoration-blue-400 text-center">{profile.profileUsername}</div>)}
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
