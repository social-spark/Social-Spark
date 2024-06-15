import {Prompt} from "@/utils/models/prompt.model";
import Link from "next/link";

type PromptCardProps = {
    prompt: Prompt;
    setOpenModal: (value: boolean) => void;
}
export function PromptCard (props: PromptCardProps) {
    // const prompt = props.prompt;
    const {prompt, setOpenModal} = props;
    return (
        <li >
            <Link onClick={()=>setOpenModal(false)}
                href={`/create-post/${prompt.promptId}`}
                className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <div className="font-semibold">{prompt.promptCategory}</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {prompt.promptBody}
                </span>
            </Link>
        </li>
    )
}