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
  tags: string,
  user: {
    id: number,
    name: string,
    email: string,
    //image: string,
  },
  liked_count: number,
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