

import React from "react";
import Image from "next/image";
import cardTopImage from "@/app/images/card-top.jpg";
import {EditProfileForm} from "@/app/edit-profile/EditProfileForm";
import {getSession} from "@/utils/fetchSession";
import {fetchProfileByProfileId, fetchProfileByUsername} from "@/utils/models/profile.model";
import {redirect} from "next/navigation";


export default async function (profileName: string) {
    const session = await getSession()
    if(session === undefined) {
        return redirect('/sign-in')
    }
    const profile = await fetchProfileByProfileId(session.profile.profileId)

    //pass profile to EditProfileForm


    return (

            <div className="container border-solid bg-white border-2 border-black grid grid-cols-2 gap-5 mx-auto sm:max-w-4xl max-w-sm rounded shadow-lg p-10 mt-5 mb-10">
            <EditProfileForm session={session}
            profile={profile}
            />


            </div>

    )
}


