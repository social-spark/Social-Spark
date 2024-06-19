import {fetchProfileByProfileId} from "@/utils/models/profile.model";


type Props ={
profileId: string,

}

export async function FollowUsername(props:Props){

    const {profileId} = props
    const profile = await fetchProfileByProfileId(profileId)
    return (
        <div className="underline decoration-blue-400 text-center">{profile.profileUsername}</div>
    )
}