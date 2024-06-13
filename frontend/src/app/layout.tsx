import type { Metadata } from 'next'
import './globals.css'
import {Flowbite, Sidebar, ThemeModeScript} from "flowbite-react";
import {Nav} from "@/app/components/Nav";
import {LeftNav} from "@/app/components/LeftNav";
import {theme} from "@/utils/theme.utils";


export const metadata: Metadata = {
    title: 'Prompt Me',
    description: '',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html>
        <head>
            <link href="/frontend/src/app/images/promptMeLogo.png" rel="icon" type="image/x-icon"/>
            <ThemeModeScript/><title>Prompt Me</title>
        </head>
        <body className={("min-h-dvh bg-[#50646F] font-sans antialiasing text-stone-800 dark:bg-gray-800 dark:text-slate-200")} >
        <Flowbite theme={{theme: theme}}>
            {children}
        </Flowbite>
        </body>
        </html>
    )
}