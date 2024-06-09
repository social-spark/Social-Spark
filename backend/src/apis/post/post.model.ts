import {z} from 'zod'
import {sql} from "../../utils/database.utils"

/**
 * The shape of a post in the post table in the database
 * @property postId {string} the primary key
 * @property postProfileId {string} the foreign key to the profile table
 * @property postPromptId {string} the foreign key to the prompt table
 * @property postBody {string} the body of the post
 * @property postDate {string} the date the post was created
 * @porperty postImage {string} the image associated with the post
 */
export const PostSchema = z.object({
postId: z.string({required_error: 'postId is required', invalid_type_error: 'postId must be a uuid or null'}).uuid({message: 'postId must be a uuid or null'}).nullable(),
    postProfileId: z.string({required_error: 'please provide a valid postProfileId', invalid_type_error: 'postProfileId must be a uuid'}).uuid({message: 'postProfileId must be a uuid'}),
    postPromptId: z.string({required_error: 'please provide a valid postPromptId', invalid_type_error: 'postPromptId must be a uuid'}).uuid({message: 'postPromptId must be a uuid'}),
    postBody: z.string({required_error: 'please provide a valid postBody', invalid_type_error: 'postBody must be a string'}).max(200, {message: 'postBody must be at less than 200 character long'}),
    postDate: z.coerce.date({required_error: 'please provide a valid postDate or null', invalid_type_error: 'postDate must be a date'}).nullable(),
    postImage: z.string({required_error: 'please provide a valid postImage or null', invalid_type_error: 'postImage must be a string'}).trim().url({message: 'please provide a valid URL for postImage'}).max(255, {message: 'please provide a valid postImage (max 255 characters)'}).nullable()
})
export type Post = z.infer<typeof PostSchema>

/**
 * posts a new post to the post table in the database and returns a message that says 'post successfully created'
 * @param post
 * @returns 'Post successfully posted'
 */
export async function insertPost(post: Post): Promise<string> {
    const { postId, postProfileId, postPromptId, postBody, postImage } = post;

    // Execute the SQL query to insert the post
    await sql`INSERT INTO post (post_id, post_profile_id, post_prompt_id, post_body, post_date, post_image) 
               VALUES (gen_random_uuid(), ${postProfileId}, ${postPromptId}, ${postBody}, now(), ${postImage})`;

    return 'Post successfully posted';
}
/**
 * gets all posts from the post table in the database
 * @returns all posts
 */

export async function selectAllPosts(): Promise<Post[]> {
    //get all posts from the post table in the database and return them
    const rowList = <Post[]>await sql `SELECT post_id, post_profile_id,post_prompt_id, post_body, post_date, post_image FROM post ORDER BY post_date DESC`

    //parse the posts from the database into an array of Post objects
    return PostSchema.array().parse(rowList)
}

export async function selectPostsByPostProfileId(postProfileId: string): Promise<Post[]> {
    //get all posts from the post table in the database by postProfileId and return them
    const rowList = <Post[]>await
        sql`SELECT post_id,post_profile_id,post_prompt_id,post_body,post_date,post_image FROM post WHERE post_profile_id = ${postProfileId}`
    //parse the post from the database into an array of post objects
    return PostSchema.array().parse(rowList)
}

export async function selectPostsByProfileUsername(profileUsername: string): Promise<Post[]> {
    // get all post from the post table in the database by profileUsername and return them
    const rowList = <Post[]>await sql`SELECT post_id,
    post_profile_id,post_prompt_id, post_body, post_date, post_image
    FROM post JOIN profile ON post.post_profile_id = profile.profile_id
    WHERE profile.profile_username = ${profileUsername}`

    return PostSchema.array().parse(rowList)

}

export async function selectPostByPostId(postId: string): Promise<Post | null> {
    // get the post from the post table in the database postId
    const rowList = <Post[]>await sql`SELECT post_id, post_profile_id, post_prompt_id, post_body, post_date, post_image
    FROM post
    WHERE post_id = ${postId}`

   //parse the post from the database into a Post object
    const result = PostSchema.array().max(1).parse(rowList)

    // return the post or null if no post is found
    return result.length === 0 ? null : result[0]
}

export async function selectPageOfPosts (page: number): Promise<Post[]> {
    //get all posts from the post table in the database and return them
    const rowList = <Post []> await sql`SELECT post_id, post_profile_id, post_prompt_id, post_body, post_date, post_image FROM post ORDER BY post_date DESC LIMIT 10 OFFSET ${page - 1} * 10`
return PostSchema.array().parse(rowList)
}

/**
 * deletes the post from the post table in the database by postId and returns a message that says 'post successfully deleted'
 * @return 'Post successfully deleted'
 */
export async function deletePostByPostId(postId: string): Promise<string> {
    //delete the post from the post table in the database by postId
    await sql`DELETE
              FROM post
              WHERE post_id = ${postId}`
    return 'Post successfully deleted'
}

/**
 * updates the post from the post table in the database by postId and returns a message that says 'post successfully deleted'
 * @return 'Post successfully posted'
 */
export async function updatePost(post: Post): Promise<string> {
    // Destructure the post object
    const { postId, postBody, postImage, postProfileId, postPromptId } = post;

    // Execute the SQL query to update the post
    await sql`UPDATE post
              SET post_body = ${postBody},
                  post_image = ${postImage},
                  post_date = now(),
                  post_profile_id = ${postProfileId},
                  post_prompt_id = ${postPromptId}
              WHERE post_id = ${postId}`;

    return 'Post successfully updated';
}
