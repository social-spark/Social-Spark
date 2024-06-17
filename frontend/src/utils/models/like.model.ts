
import {z} from "zod";

export const LikeSchema = z.object({
    likeProfileId: z.string({required_error: 'please provide a valid likeProfileId'}).uuid({message: 'please provide a valid uuid for likeProfileId'}),
    likePostId: z.string({required_error: 'please provide a valid likePostId'}).uuid({message: 'please provide a valid uuid for likePostId'}),
    likeDate: z.coerce.date({required_error: 'please provide a valid likeDate or null'}).nullable()
})

export type Like = z.infer<typeof LikeSchema>

export async function fetchLikesByPostId(likePostId:string) : Promise<Like[]> {
    //get all likes from postId in the post table in the database and return them
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/like/likePostId/${likePostId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error fetching likes')
        } else {
            return response.json()
        }

    })

    return LikeSchema.array().parse(data)

}

