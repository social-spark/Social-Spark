"use server"
import {fetchAllPosts} from "@/utils/models/post.model";
import {PostCard} from "@/app/(index)/PostCard";
import {getSession} from "@/utils/fetchSession";
import {redirect} from "next/navigation";
import {PostForm} from "@/app/create-post/[promptId]/PostForm";
import React from "react";


export default async function () {

    const session = await getSession()
    console.log(session)
    if(session === undefined) {
        return redirect('/sign-in')
    }

    const posts = await fetchAllPosts()
    console.log(posts)

    const profile = session.profile

    return (
        <>
            <main>
                    {posts.map((post) => <PostCard key={post.postId} post={post}/>)}
            </main>
        </>
)
}

