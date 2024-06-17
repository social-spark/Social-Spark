import {fetchPromptByPromptId, Prompt} from "@/utils/models/prompt.model"
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/models/profile.model";
import Image from "next/image"
import cardTopImage from "@/app/images/card-top.jpg"
import React from "react";
import {fetchLikesByPostId} from "@/utils/models/like.model";
import {LikePost} from "@/app/components/LikePost";
import {Session} from "node:inspector";

type Props = {
	post: Post
	session: Session
}

export async function PostCard(props: Props) {
	const {post, session} = props
	const profile = await fetchProfileByProfileId(post.postProfileId)
	const prompt	= await fetchPromptByPromptId(post.postPromptId)

	// @ts-ignore
	const likes = await fetchLikesByPostId(post.postId)
	console.log(likes)

	return (
		<>
			<div className= "flex justify-center">
				<div className="max-w-screen-lg rounded overflow-hidden bg-white mx-auto shadow-lg my-10 border border-slate-950">
					{post.postImage	&& (
					<img className="w-full" src={post.postImage} alt="Sunset in the mountains"/>
					)}
						<div className="pr-4 pl-2 py-4">
							<p className="inline-flex items-center mr-3 text-sm font-semibold"><img
								className="mr-2 w-10 h-10 rounded-full"
								src={profile.profileImage ?? 'https://picsum.photos/seed/picsum/200/300'}
								alt="profile image"/>{profile.profileUsername}</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								<time dateTime="2022-02-08"
									  title="February 8th, 2022">{post.postDate?.toLocaleString()}
								</time>
							</p>
							<p className="inline-flex items-center mr-3 text-sm font-bold mb-2">#{prompt.promptCategory}</p>
							<p className="inline-flex items-center mr-3 text-sm font-bold mb-2">{prompt.promptBody}</p>
							<p className="text-gray-500 dark:text-gray-400">{post.postBody}</p>

							<LikePost likes={likes} postId={post.postId} session={session}/>
						</div>
					</div>
			</div>
		</>

)

}