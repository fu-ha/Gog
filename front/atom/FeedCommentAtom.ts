import { atom } from "recoil"

export type CommentDataType = {
  id: number,
  user_id: number,
  post_id: number,
  content: string,
  created_at: string,
  comment_like: {
    id: number,
    user_id: number,
    post_id: number,
    comment_id: number
  },
  comment_liked_count: number,
  user: {
    id: number,
    name: string,
    email: string,
  },
}

export const FeedCommentAtom = atom<CommentDataType[]>({
  key: 'FeedCommentAtom',
  default: []
})