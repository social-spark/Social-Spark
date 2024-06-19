"use client";

import {Session} from "@/utils/fetchSession";
import React from "react";
import {Profile} from "@/utils/models/profile.model";
import {useRouter} from "next/navigation";
import {Follow} from "@/utils/models/follow.model";

type FollowButtonProps = {
    session: Session,
    profile: Profile
    follows: Follow[]
}

export function FollowButton (props:FollowButtonProps){
const { session, profile, follows } = props;
const router = useRouter()
const submitFollow = () => {
fetch(`/apis/follow/toggle`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "authorization": `${session.authorization}`
    },
    body: JSON.stringify({followedProfileId: profile.profileId, followingProfileId: session.profile.profileId, followDateCreated: null})

}).then(response => response.json()).then(json => {
    console.log("I made it")
   let type = 'failure'
   if(json.status === 200) {
       type = 'success'
       router.refresh()
   }
})
}
return (
    <button type="button" onClick={submitFollow}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 focus:outline-none">
        {follows.filter(follow => follow.followingProfileId === session.profile.profileId).length ? "unfollow" : "follow"}

    </button>

);

}