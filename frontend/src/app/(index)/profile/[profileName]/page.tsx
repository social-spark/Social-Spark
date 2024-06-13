import {getSession} from "@/utils/fetchSession";
import {fetchProfileByProfileFullName} from "@/utils/models/profile.model";
import {fetchPostsByProfileId} from "@/utils/models/post.model";
import {redirect} from "next/navigation";

type Props = {
    params:{
        profileFullName: string
    }
}
export default async function (props: Props) {

    const {profileFullName} = props.params
    const session = await getSession()


    return (
        <>
            <main className="container lg:w-2/3 grid mx-auto">
                Welcome to your profile page.
            </main>
        </>
    )
}


export async function getProfileAndPosts(profileFullName: string) {
    const profile = await fetchProfileByProfileFullName(profileFullName)
    if(profile === null) {
        return(redirect('/404'))
    }
    const posts = await fetchPostsByProfileId(profile.profileId)
    return {profile, posts}
}