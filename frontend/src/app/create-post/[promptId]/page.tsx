
import {PostForm} from "@/app/create-post/[promptId]/PostForm";
import {getSession} from "@/utils/fetchSession";
import {redirect} from "next/navigation";
import {fetchPromptByPromptId} from "@/utils/models/prompt.model";
type Props = {
    params : {promptId: string}
}
export default async function Page(props: Props){

    const session = await getSession()
    const prompt = await fetchPromptByPromptId(props.params.promptId)
    if(session === undefined) {
        return redirect('/sign-in')
    }

    return (
        <>
            <div className= "flex justify-center">
            <div className="max-w-screen-lg rounded overflow-hidden bg-white mx-auto shadow-lg my-10 border border-slate-950">
        <h1>{prompt.promptBody}</h1>
        <PostForm session={session} prompt={prompt}/>
            </div>
            </div>

        </>
    )
}