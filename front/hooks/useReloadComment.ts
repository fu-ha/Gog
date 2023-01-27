import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedCommentAtom, CommentReloadSelector, CommentDataType } from '../atom/FeedCommentAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadCommentFetching(): Promise<void>,
}

export const useReloadComment = (): useFeedFetchType => {
  const setFeedComment = useSetRecoilState(FeedCommentAtom)
  const SelectoredCommentReloadUrl = useRecoilValue(CommentReloadSelector)
  
  async function fetchFeedComments(url: string): Promise<CommentDataType[]> {
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
  
  const reloadCommentFetching = async () => {
    const result = await fetchFeedComments(SelectoredCommentReloadUrl)
    setFeedComment(result)
  }
  
  return { reloadCommentFetching }
}
