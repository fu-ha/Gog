import { atom } from "recoil"

export type CommentType = {
  id: number,
  content: string,
  user_id: number,
  post_id: number,
  created_at: string,
  updated_at?: string,
  user: {
    id: number,
    name: string,
    email: string,
  },
  //image_url?: string
  image?: {
    url: string,
  } 
}

export const FeedCommentAtom = atom<CommentType[]>({
  key: 'FeedCommentAtom',
  default: []
})