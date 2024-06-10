
import {z} from 'zod'

export const PostSchema = z.object({
    postId: z.string({required_error: 'postId is required', invalid_type_error: 'postId must be a uuid or null'}).uuid({message: 'postId must be a uuid or null'}).nullable(),
    postProfileId: z.string({required_error: 'please provide a valid postProfileId', invalid_type_error: 'postProfileId must be a uuid'}).uuid({message: 'postProfileId must be a uuid'}),
    postPromptId: z.string({required_error: 'please provide a valid postPromptId', invalid_type_error: 'postPromptId must be a uuid'}).uuid({message: 'postPromptId must be a uuid'}),
    postBody: z.string({required_error: 'please provide a valid postBody', invalid_type_error: 'postBody must be a string'}).max(200, {message: 'postBody must be at less than 200 character long'}),
    postDate: z.coerce.date({required_error: 'please provide a valid postDate or null', invalid_type_error: 'postDate must be a date'}).nullable(),
    postImage: z.string({required_error: 'please provide a valid postImage or null', invalid_type_error: 'postImage must be a string'}).trim().url({message: 'please provide a valid URL for postImage'}).max(255, {message: 'please provide a valid postImage (max 255 characters)'}).nullable()
})
export type Post = z.infer<typeof PostSchema>


export async function fetchAllPosts() : Promise<Post[]> {
    //get all posts from the post table in the database and return them
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/post`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error fetching threads')
        } else {
            return response.json()
        }

    })

    return PostSchema.array().parse(data)

}