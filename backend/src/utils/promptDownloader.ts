import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set correctly
});

interface Prompt {
    promptId: string | null,
    promptBody: string, // Changed to string to hold the text
    promptCategory: number
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
            // make call to the OpenAI API to get the prompt
            const openai = new OpenAI();

            async function main() {
                const prompt = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: "Create me a simple topic to post that is about travel" }],
                });
                console.log(prompt.choices[0].message.content)
            }

            await main();
        } catch (error) {
            console.error(error)
        }
    }
}


