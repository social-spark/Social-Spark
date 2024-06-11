
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/models/profile.model";


type Props = {
	post: Post
}

export async function PostCard(props: Props) {
	const {post} = props
	const profile = await fetchProfileByProfileId(post.postProfileId)

	return (
		<>
			<div className="max-w-sm rounded overflow-hidden shadow-lg my-5">
				<img className="mr-2 w-6 h-6 rounded-full" src={post.postImage ?? 'https://picsum.photos/seed/picsum/200/300'}
					 alt="profile image"/>
				<div className="mx-auto py-4 content-center">

					<div className="flex items-center">
						<p className="inline-flex items-center mr-3 text-sm font-semibold">{profile.profileId}</p>
						<div className="font-bold mb-2">#prompt</div>
						<p className="inline-flex items-center mr-3 text-sm font-semibold">{post.postPromptId}</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							<time dateTime="2022-02-08"
								  title="February 8th, 2022">{post.postDate?.toLocaleString()}
							</time>
						</p>
						<p className="text-gray-500 dark:text-gray-400">{post.postBody}</p>
					</div>
				</div>
			</div>
		</>
	)

}

