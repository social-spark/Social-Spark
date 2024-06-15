import type { Metadata } from 'next'
import './globals.css'
import {Flowbite, Sidebar, ThemeModeScript} from "flowbite-react";
import {theme} from "@/utils/theme.utils";
import {Navigation} from "@/app/components/Navigation";
import {getSession} from "@/utils/fetchSession";
import {fetchAllPrompts, fetchPromptByPromptDate} from "@/utils/models/prompt.model";


export const metadata: Metadata = {
    title: 'Prompt Me',
    description: '',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default async function RootLayout(props : RootLayoutProps) {
    const { children } = props
    const session = await getSession()
    const prompts = await fetchPromptByPromptDate()
    return (
        <html>
        <head>
            <link href="/frontend/src/app/images/promptMeLogo.png" rel="icon" type="image/x-icon"/>
            <ThemeModeScript/><title>Prompt Me</title>
        </head>
        <body className={("min-h-dvh bg-[#50646F] font-sans antialiasing text-stone-800 dark:bg-gray-800 dark:text-slate-200")} >
        <Flowbite theme={{theme: theme}}>
            <Navigation session={session} prompts={prompts}/>
            {children}
        </Flowbite>
        </body>
        </html>
    )
}