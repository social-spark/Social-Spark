"use client";

import liked from "@/app/images/liked.png";
import Image from "next/image";
import { useState } from "react";
import {Like} from "@/utils/models/like.model";
import {Post} from "@/utils/models/post.model";
import {Session} from "@/utils/fetchSession";
import {useRouter} from "next/navigation";
type LikeProps = {
    session: Session
    likes: Like[]
    postId: string
}
export function LikePost(props: LikeProps) {
    const {likes, postId, session} = props;
    const router = useRouter()
    function toggleLike () {

        fetch(`/apis/like/toggle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${session.authorization}`
            },
            body: JSON.stringify({likePostId: postId, likeProfileId: session.profile.profileId, likeDate: null})
        }).then(response => response.json()).then(json => {
            let type = 'failure'
            if (json.status === 200) {
                type ='success'
                router.refresh()
            }
        })
    }

    return (
        <button className="float-right pr-10">
            <br/>
            <Image className={`hover:bg-[#42AEEE] rounded-full size-6 ${likes.filter(like=>like.likeProfileId===session.profile.profileId).length && 'bg-[#42AEEE]'}`} src={liked} alt="liked icon" onClick={toggleLike}/>
            <p>{likes.length}</p>
        </button>
    );
}
