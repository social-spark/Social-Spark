import OpenAI from "openai";
import {sql} from "./database.utils";
import {Prompt} from "../apis/prompt/prompt.model";
// import schedule from "node-schedule";

// var cron = require('node-cron');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set correctly
});

const prompts = [
    { content: "Create me a simple topic to post that is about travel", category: "Travel" },
    { content: "Create me a simple topic to post that is about food", category: "Food" },
    { content: "Create me a simple topic to post that is about health", category: "Health" },
    { content: "Create me a simple topic to post that is about technology", category: "Technology" },
    { content: "Create me a simple topic to post that is about fashion", category: "Fashion" },
    { content: "Create me a simple topic to post that is about entertainment", category: "Entertainment" },
];


export async function insertPrompt(prompt: Prompt): Promise<string> {
    const { promptId, promptCategory, promptBody, promptDate } = prompt;

    // Execute the SQL query to insert the post
    await sql`INSERT INTO prompt (prompt_id, prompt_category, prompt_body, prompt_date) 
               VALUES (gen_random_uuid(), ${promptCategory}, ${promptBody}, now())`;

    return 'prompt successfully posted';
}

export function dataDownloader() : Promise<any> {
    return main()

    async function main() {
        try {
            await downloadPosts()

        } catch (e) {
            console.log(e)
        }
    }


    async function downloadPosts() {
        try {
            for (const {content, category} of prompts) {
                const response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content}],
                });

                if (response.choices && response.choices.length > 0) {
                    const responseText = response.choices[0].message.content;
                    console.log(responseText);

                    // Insert response into PostgreSQL
                    await insertPrompt({
                        promptId: '',
                        promptCategory: category,
                        promptBody: responseText,
                        promptDate: new Date()
                    });
                } else {
                    console.log('No response received');
                }
            }
        } catch (error) {
            console.error('Error encountered:', error);
        }
    }
}

setInterval(async () => {
    console.log('Running scheduled task to download new prompts');
    await dataDownloader();
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

// setInterval(async () => {
//     console.log('Running scheduled task to download new prompts');
//     await dataDownloader();
// }, 60 * 1000); // 60 * 1000 milliseconds = 1 minute

// schedule.scheduleJob('* * * * *', async () => {
//     console.log('Running scheduled task to download new prompts');
//     await dataDownloader();
// });

// cron.schedule('0 0 * * *', async () => {
//     console.log('Running scheduled task to download new prompts');
//     await dataDownloader();
// });

// -------------------------------------------------------------------------------------
// import OpenAI from "openai";
//
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
//
// const prompts = [
//     "Create me a simple topic to post that is about travel",
//     "Create me a simple topic to post that is about food",
//     "Create me a simple topic to post that is about health",
//     "Create me a simple topic to post that is about technology",
//     "Create me a simple topic to post that is about fashion",
//     "Create me a simple topic to post that is about entertainment",
// ];
//
// export async function dataDownloader(): Promise<void> {
//     try {
//         await downloadPosts();
//     } catch (e) {
//         console.error('Main function error:', e);
//     }
// }
//
// async function downloadPosts() {
//     try {
//         for (const content of prompts) {
//             const response = await openai.chat.completions.create({
//                 model: "gpt-3.5-turbo",
//                 messages: [{ role: "user", content }],
//             });
//
//             if (response.choices && response.choices.length > 0) {
//                 console.log(response.choices[0].message.content);
//             } else {
//                 console.log('No response received');
//             }
//         }
//     } catch (error) {
//         console.error('Error encountered:', error);
//     }
// }
//
// ------------------------------------------

//
// import OpenAI from "openai";
//
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set correctly
// });
//
// interface Prompt {
//     promptId: string | null,
//     promptBody: string, // Changed to string to hold the text
//     promptCategory: number
// }
//
// export function dataDownloader() : Promise<any> {
//     return main()
//     async function main() {
//         try {
//             await downloadPosts()
//
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     async function downloadPosts() {
//         try {
//             // make call to the OpenAI API to get the prompt
//             const openai = new OpenAI();
//
//             const prompts = [
//                 { role: "user", content: "Create me a simple topic to post that is about travel" },
//                 { role: "user", content: "Create me a simple topic to post that is about food" },
//                 { role: "user", content: "Create me a simple topic to post that is about health" },
//                 { role: "user", content: "Create me a simple topic to post that is about technology" },
//                 { role: "user", content: "Create me a simple topic to post that is about fashion" },
//                 { role: "user", content: "Create me a simple topic to post that is about entertainment" },
//             ]
//
//
//             async function main() {
//                 const prompt = await openai.chat.completions.create({
//                     model: "gpt-3.5-turbo",
//                     messages: [{ role: "user", content: "Create me a simple topic to post that is about travel" }],
//                 });
//                 console.log(prompt.choices.length)
//             }
//
//             await main();
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }
//
//
