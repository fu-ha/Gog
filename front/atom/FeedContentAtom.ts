import { atom, selector } from "recoil"
import axios from "axios"
import Cookies from "js-cookie"

export type MicropostType = {
  id: number,
  user_id: number,
  content: string,
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
    image?: {
      url: string,
    },
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
//  posts: MicropostType[]
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


export const PostReloadSelector = selector({
  key: 'PostReloadSelector',
  get: async () => {
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}posts`
    return reload_url 
  }
})
