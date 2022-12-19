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


export const FeedReloadSelector = selector({
  key: 'FeedReloadSelector',
  // get: async ({ get }) => {
  get: async () => {
    // const content = get(FeedContentAtom)
    // const reload_url = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}posts`, {
    //   headers: {
    //     "access-token": Cookies.get("access-token") || "",
    //     "client": Cookies.get("client") || "",
    //     "uid": Cookies.get("uid") || ""
    //   }
    // })
    // const reloadFetching = await reload_url.data
    // return reloadFetching
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}posts`
    // if (!content) {
    //   return 
    // }
    return reload_url 
  }
})

export const RefreshSelector = selector<MicropostType[]>({
  key: 'RefreshSelector',
  get: async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}posts`, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
    const json = await response.data
    return json
  }
})


/*export const FetchSelector = atom({
  key: 'FetchSelector',
  default: selector({
    key: 'getFetchSelector',
    get: async ({ get }) => {
      try {
        const response = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}posts`)
        const json = await response.data
        return json
      } catch (error) {
        return error
      }
    }
  })
})*/