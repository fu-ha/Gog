import useSWR from 'swr';

export const PostLikesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}post_likes`;

type PostLikesData = {
  liked_microposts: number[]
}

type usePostLikesType = {
  post_likes_data: PostLikesData | null | undefined,
  post_likes_error: string | null
}

export function useLikesSWR(): usePostLikesType {
  const { data: post_likes_data, error: post_likes_error } = useSWR(PostLikesUrl);

  return { post_likes_data, post_likes_error}
}
