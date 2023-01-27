import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedContentAtom, PostReloadSelector, MicropostType } from '../atom/FeedContentAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadPostFetching(): Promise<void>,
}

export const useReloadPost = (): useFeedFetchType => {
  const setFeedContent = useSetRecoilState(FeedContentAtom)
  const SelectoredPostReloadUrl = useRecoilValue(PostReloadSelector)
  
  async function fetchFeedContents(url: string): Promise<MicropostType[]> {
    const response = await axios.get(url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
    const json = await response.data
    return json
  }
  
  const reloadPostFetching = async () => {
    const result = await fetchFeedContents(SelectoredPostReloadUrl)
    setFeedContent(result)
  }
  
  return { reloadPostFetching }
}
