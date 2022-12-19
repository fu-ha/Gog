import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedContentAtom, FeedReloadSelector, MicropostType } from 'atom/FeedContentAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadFetching(): Promise<void>,
}

export const useReloadFetch = (): useFeedFetchType => {
  const setFeedContent = useSetRecoilState(FeedContentAtom)
  const SelectoredFeedReloadUrl = useRecoilValue(FeedReloadSelector)
  
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
  
  const reloadFetching = async () => {
    const result = await fetchFeedContents(SelectoredFeedReloadUrl)
    setFeedContent(result)
  }
  
  return { reloadFetching }
}
