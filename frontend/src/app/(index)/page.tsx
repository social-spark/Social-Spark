"use server"
import {fetchAllPosts} from "@/utils/models/post.model";
import {PostCard} from "@/app/(index)/PostCard";
import {Nav} from "@/app/components/Nav";
import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import React from "react";
import {main} from "@popperjs/core";
import Image from "next/image";
import cardTopImage from "@/app/images/card-top.jpg";

export default async function () {
    const posts = await fetchAllPosts()
    console.log(posts)
    console.log('hello world')

    return (
        <>
            <main>
                <Nav/>
                    <form className="flex-col gap-4 py-20 w-3/4 flex items-center justify-center container mx-auto bg-slate-400 md:mt-16 md:rounded-lg">
                        <div>
                            <TextInput id="First-Name" type="First Name" placeholder="First Name" required/>
                        </div>
                        <div>
                            <TextInput id="Last-Name" type="Last Name" placeholder="Last Name" required/>
                        </div>
                        <div>
                            <TextInput id="User-Name" type="User Name" placeholder="User Name" required/>
                        </div>
                        <div>
                            <TextInput id="Email" type="Email" placeholder="name@example.com" required/>
                        </div>
                        <div>
                            <TextInput id="Password" type="Password" placeholder="Password" required/>
                        </div>
                        <div>
                            <TextInput id="Re-enter-Password" type="Password" placeholder="Re-enter Password" required/>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>

                    {posts.map((post) => <PostCard key={post.postId} post={post}/>)}
            </main>
        </>
)
}
