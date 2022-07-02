import useSWR from 'swr';

export const CommentLikesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}comment_likes`;

type CommentLikesData = {
  liked_comments: number[]
}

type useCommentLikesType = {
  comment_likes_data: CommentLikesData | null | undefined,
  comment_likes_error: string | null
}

export function useLikesSWR(): useCommentLikesType {
  const { data: comment_likes_data, error: comment_likes_error } = useSWR(CommentLikesUrl);

  return { comment_likes_data, comment_likes_error}
}