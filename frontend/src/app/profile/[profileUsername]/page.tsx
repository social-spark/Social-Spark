
import React from "react";
import {LeftNav} from "@/app/components/LeftNav";
import profileImage from "@/app/images/profile.png";
import setting from "@/app/images/settingsicon.png"
import Image from "next/image";
import {fetchProfileByUsername} from "@/utils/models/profile.model";
import {redirect} from "next/navigation";
import {getSession} from "@/utils/fetchSession";
import {fetchPostsByProfileId} from "@/utils/models/post.model";
import {PostCard} from "@/app/(index)/PostCard";
import Link from "next/link";
import {FollowButton} from "@/app/profile/[profileUsername]/FollowButton";
import {fetchFollowsByFollowingProfileId} from "@/utils/models/follow.model";

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
        const follows = await fetchFollowsByFollowingProfileId(profile.profileId)
    return (
        <main className="container mx-auto">

            <section className="flex flex-row md:flex-row pt-6 space-y-6 md:space-y-0 md:space-x-6">

                <div className="hidden  bg-amber-400 lg:inline-block">
                    <LeftNav/>
                </div>


                <div className="flex-1">
                    <section className="grid grid-cols-2 md:grid md:grid-cols-3 border border-slate-950 bg-gray-300 rounded-lg p-6 md:space-x-6"
                        id="profile-header">
                        <Image className="object-scale-down h-36 w-36 row-span-2 " src={profile.profileImage ?? profileImage} alt="Profile picture"/>

                        <div className="col-start-2  space-y-2 md:space-y-0">
                            <p className="py-1 text-2xl font-bold">@{profile.profileUsername}</p>
                            <p className="py-1 text-xl">{profile.profileFullName}</p>
                        </div>

                        <div className="md:col-start-3 flex items-center space-y-2 md:space-y-0 md:space-x-2 space-x-4">
                            {session && <FollowButton follows={follows} session={session} profile = {profile}/>}
                            {session?.profile.profileUsername === profile.profileUsername && (
                                <Link href="/edit-profile">
                            <button className="flex items-center justify-center">
                                <Image  width={40} height={40} src={setting} alt="Setting icon"/>
                            </button>
                             </Link>
                                )}
                        </div>

                        <p className="col-span-2 md:col-start-2 md:col-span-2 text-l pt-5">{profile.profileBio}</p>

                    </section>
                    {posts.map((post) => <PostCard key={post.postId} post={post} session={session}/>)}
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

