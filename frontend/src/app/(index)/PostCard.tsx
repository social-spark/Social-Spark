import {fetchPromptByPromptId, Prompt} from "@/utils/models/prompt.model"
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/models/profile.model";
import Image from "next/image"
import cardTopImage from "@/app/images/card-top.jpg"
import React from "react";

type Props = {
	post: Post
}

export async function PostCard(props: Props) {
	const {post} = props
	const profile = await fetchProfileByProfileId(post.postProfileId)
	const prompt	= await fetchPromptByPromptId(post.postPromptId)

	return (
		<>
			<form className= " flex justify-center">
				<div className="max-w-sm rounded overflow-hidden shadow-lg my-5 ">
						<Image className="w-full" src={cardTopImage} alt="Sunset in the mountains"/>
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
						</div>
					</div>
			</form>
		</>

)

}