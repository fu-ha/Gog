import { atom } from "recoil"

export type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  //image_url?: string
  image?: {
    url: string,
  },
  tag?: string,
  user: {
    id: number,
    name: string,
    email: string,
    //image: string,
  },
  post_liked_count: number,
  post_like: {
    id: number,
    user_id: number,
    post_id: number,
  }
  post_liked: boolean,
  comment: {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: string,
  },
  comment_count: number,
  comment_like: {
    id: number,
    user_id: number,
    post_id: number,
    comment_id: number,
    created: string,
  },
  comment_liked_count: number
}

//export type FeedContentType = {
  //posts: MicropostType[]
//}

export const FeedContentAtom = atom<MicropostType[]>({
  key: 'FeedContentAtom',
  default: []
})

/*export const FeedContentAtom = atom<MicropostType>({
  key: 'FeedContentAtom',
  default: {
    id: 0,
    content: '',
    user_id: 0,
    created_at: '',
    name: '',
    image_url: '' 
  }
})*/