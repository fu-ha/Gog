import useSWR from 'swr'

//export const PostLikesUrl = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'
export const PostsUrl = process.env.NEXT_PUBLIC_BASE_URL + 'posts'

type PostsData = {
  //liked_microposts: number[]
  id: number,
  user_id: number, 
  //post_id: number,
  //post_liked: boolean*/
  liked_count: number
}

type usePostsType = {
  posts_data: PostsData | null | undefined,
  posts_error: string | null
}

export function usePostSWR(): usePostsType {
  const { data: posts_data, error: posts_error } = useSWR(PostsUrl, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  return { posts_data, posts_error }
}
