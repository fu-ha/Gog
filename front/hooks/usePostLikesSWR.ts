import useSWR from 'swr'

//export const PostLikesUrl = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'
//export const PostLikesUrl = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'

type PostLikesData = {
  //liked_microposts: number[]
  id: number,
  user_id: number, 
  //post_id: number,
  //post_liked: boolean*/
  liked_icon: boolean
}

type usePostLikesType = {
  post_likes_data: PostLikesData | null | undefined,
  post_likes_error: string | null
}

export function usePostLikeSWR({id}: PostLikesData): usePostLikesType {
  const PostLikesUrl = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${id}`
  const { data: post_likes_data, error: post_likes_error } = useSWR(PostLikesUrl, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  return { post_likes_data, post_likes_error }
}
