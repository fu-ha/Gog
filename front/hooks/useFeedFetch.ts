import { useRecoilState } from "recoil"
//import { MicropostType } from "types/MicropostType"
import { FeedContentAtom, FeedContentType } from "atom/FeedContentAtom"
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  handleFetching(): Promise<void>,
  isHavingPosts(): boolean
}

const post_get_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'

export const useFeedFetch = (): useFeedFetchType => {
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  
  async function fetchFeedContents(): Promise<FeedContentType> {
    const res = await axios.get(post_get_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
    const json = await res.data
    return json
  }
  
  const handleFetching = async() => {
    const result = await fetchFeedContents()
    if (FeedContent) {
      //const newResult = { posts: FeedContent.posts.concat(result.posts) }
      //setFeedContent(newResult)
    }
  }
  
  
  
  const isHavingPosts = (): boolean => {
    if (FeedContent) {
      return FeedContent.hasOwnProperty("posts")
    }
    return false
  }
  
  return { handleFetching, isHavingPosts }
}