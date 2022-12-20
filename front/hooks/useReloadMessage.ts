import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedMessageAtom, MessageReloadSelector, MessageDataType } from 'atom/FeedMessageAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadFetching(): Promise<void>,
}

export const useReloadMessage = (): useFeedFetchType => {
  const setFeedMessage = useSetRecoilState(FeedMessageAtom)
  const SelectoredMessageReloadUrl = useRecoilValue(MessageReloadSelector)
  
  async function fetchFeedMessages(url: string): Promise<MessageDataType[]> {
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
    const result = await fetchFeedMessages(SelectoredMessageReloadUrl)
    setFeedMessage(result)
  }
  
  return { reloadFetching }
}
