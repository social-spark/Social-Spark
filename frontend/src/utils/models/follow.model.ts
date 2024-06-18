
import {z} from "zod";
import {LikeSchema} from "@/utils/models/like.model";

export const FollowSchema = z.object({
    followingProfileId: z.string({required_error: 'please provide a valid followingProfileId'}).uuid({message: 'please provide a valid uuid for followingProfileId'}),
    followedProfileId: z.string({required_error: 'please provide a valid followedProfileId'}).uuid({message: 'please provide a valid uuid for followedProfileId'}),
    followDateCreated: z.date({required_error: 'please provide a valid followDateCreated or null'}).nullable(),
})

export type Follow = z.infer<typeof FollowSchema>

//followers
export async function fetchFollowsByFollowedProfileId(followedProfileId:string): Promise<Follow[]>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/follow/followedProfileId/${followedProfileId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error fetching follows')
        } else {
            return response.json()
        }

    })

    return FollowSchema.array().parse(data)

}

//following
export async function fetchFollowsByFollowingProfileId(followingProfileId:string): Promise<Follow[]>{
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/follow/followingProfileId/${followingProfileId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error fetching follows')
        } else {
            return response.json()
        }

    })

    return FollowSchema.array().parse(data)

}
