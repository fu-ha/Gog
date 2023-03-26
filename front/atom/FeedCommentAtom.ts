import { atom, selector, selectorFamily } from "recoil"
import axios from "axios"
import Cookies from "js-cookie"

export type CommentDataType = {
  id: number,
  user_id: number,
  post_id: number,
  image?: {
    url: string,
  },
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
    image?: {
      url: string,
    },
    email: string,
  },
}

export const FeedCommentAtom = atom<CommentDataType[]>({
  key: 'FeedCommentAtom',
  default: []
})

// export const CommentReloadSelector = selectorFamily<CommentDataType[], number>({
//   key: 'CommentReloadSelector',
//   get: post_id => async () => {
//   // get: async () => {
//     const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}posts/${post_id}/comments`
//     // const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}posts/1/comments`
//     // return reload_url 
//     const response = await axios(reload_url, {
//       headers: {
//         "access-token": Cookies.get("access-token") || "",
//         "client": Cookies.get("client") || "",
//         "uid": Cookies.get("uid") || ""
//       }
//     })
//     const json = await response.data
//     return json
//   }
// })

export const CommentReloadSelector = selector({
  key: 'CommentReloadSelector',
  get: async () => {
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}fetch_comments`
    return reload_url 
  }
})