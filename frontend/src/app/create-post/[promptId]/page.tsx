import {PostForm} from "@/app/create-post/[promptId]/PostForm";
import {getSession} from "@/utils/fetchSession";
import {redirect} from "next/navigation";
import {fetchPromptByPromptId} from "@/utils/models/prompt.model";
type Props = {
    params : {promptId: string}
}
export default async function Page(props: Props){
console.log(props.params.promptId)
    const session = await getSession()
    console.log(session)
    const prompt = await fetchPromptByPromptId(props.params.promptId)
    if(session === undefined) {
        return redirect('/sign-in')
    }

    return (
        <PostForm session={session} prompt={prompt}/>
    )
}