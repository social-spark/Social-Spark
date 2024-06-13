

import {Navigation} from "@/app/components/Navigation";
import {TextInput} from "flowbite-react";
import React from "react";
import {Posts} from "@/app/components/Posts";
import {LeftNav} from "@/app/components/LeftNav";
import profileImage from "@/app/images/profile.png";
import setting from "@/app/images/settingsicon.png"
import Image from "next/image";
import {PromptBox} from "@/app/components/PromptBox";
import {fetchProfileByUsername} from "@/utils/models/profile.model";
import {redirect} from "next/navigation";
import {getSession} from "@/utils/fetchSession";
import {fetchPostsByProfileId} from "@/utils/models/post.model";

type Props = {
    params:{
        profileUsername: string
    }
}
export default async function ProfileHeader(props: Props)
                {

        const {profileUsername} = props.params
        const session = await getSession()
        const {profile, posts}=await getProfileAndPosts(profileUsername)
        console.log(posts)
    return (
        <main className="container mx-auto">
            <Navigation />

            <section className="flex flex-row md:flex-row pt-6 space-y-6 md:space-y-0 md:space-x-6">
                <PromptBox />

                <div className="hidden  bg-amber-400 lg:inline-block">
                    <LeftNav/>
                </div>


                <div className="flex-1">
                    <section className="grid grid-cols-2 md:grid md:grid-cols-3 border border-slate-950 bg-gray-300 rounded-lg p-6 md:space-x-6"
                        id="profile-header">
                        <Image className="object-scale-down h-36 w-36 row-span-2 " src={profileImage} alt="Profile picture"/>

                        <div className="col-start-2  space-y-2 md:space-y-0">
                            <p className="py-1 text-2xl font-bold">@{profile.profileUsername}</p>
                            <p className="py-1 text-xl">{profile.profileFullName}</p>
                        </div>

                        <div className="md:col-start-3 flex items-center space-y-2 md:space-y-0 md:space-x-2 space-x-4">
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 focus:outline-none">
                                Follow
                            </button>
                            <button className="flex items-center justify-center">
                                <Image width={40} height={40} src={setting} alt="Setting icon"/>
                            </button>
                        </div>

                        <p className="col-span-2 md:col-start-2 md:col-span-2 text-l pt-5">Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.
                            Voluptatibus
                            quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>

                    </section>
                    <Posts/>
                </div>

            </section>

        </main>
    );
}

    export async function getProfileAndPosts(profileUsername: string) {
        const profile = await fetchProfileByUsername (profileUsername)
        if (profile === null) {
            return (redirect('/404'))
        }
        const posts = await fetchPostsByProfileId(profile.profileId)
        return {profile, posts}
    }

// export default function ProfileHeader () {
//     return (
//         <main className="container mx-auto rounded-lg">
//             <Navigation/>
//         <PromptBox/>
//
//         <section className="grid grid-cols-3 md:grid-cols-3">
//
//
//             <div className="grid grid-cols-subgrid gap-4 col-span-3 pt-6">
//                 <section className="container border border-slate-950 rounded-lg col-start-1 col-span-3 bg-white">
//
//                     <div className="grid md:grid-cols-4 grid-cols-3 ">
//                         <Image className="object-scale-down h-36 w-36 p-5" src={profile} alt="Sunset in the mountains"/>
//
//                         <div className="col-start-2">
//                             <p className="py-1">@UserName</p>
//                             <p className="py-1">Full Name</p>
//                             <TextInput id="Bio" type="Bio" placeholder="Bio" className="py-3"/>
//                         </div>
//
//                         <div
//                             className="md:col-start-4 col-start-3 md:flex md:flex-row flex flex-col flex-wrap place-content-evenly">
//                             <button type="button"
//                                     className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Follow
//                             </button>
//                             <button className="w-30 mx-auto">
//                                 <Image className="" width={30}
//                                        height={30} src={setting} alt="setting icon"/>
//                             </button>
//                         </div>
//                     </div>
//                 </section>
//
//                 <div className="hidden lg:block">
//                     <LeftNav/>
//                 </div>
//
//
//                 <div className="lg:col-start-2 lg:col-span-4 sm:pl-11 col-start-1 col-span-4">
//                     <Posts/>
//                 </div>
//             </div>
//         </section>
//
//
//         </main>
//     )
// }
