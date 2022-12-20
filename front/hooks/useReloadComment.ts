import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedCommentAtom, CommentReloadSelector, CommentDataType } from 'atom/FeedCommentAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadFetching(): Promise<void>,
}

// export const useReloadComment = ({ post_id }: CommentDataType): useFeedFetchType => {
//   const setFeedComment = useSetRecoilState(FeedCommentAtom)
//   const SelectoredCommentReloadUrl = useRecoilValue(CommentReloadSelector(post_id))
  
//   const fetchFeedComments = async (obj: CommentDataType[]) => {
//     return obj
//   }
  
//   const reloadFetching = async () => {
//     const result = await fetchFeedComments(SelectoredCommentReloadUrl)
//     // const result = await SelectoredCommentReloadUrl
//     setFeedComment(result)
//   }
  
//   return { reloadFetching }
// }

export const useReloadComment = (): useFeedFetchType => {
  const setFeedComment = useSetRecoilState(FeedCommentAtom)
  const SelectoredCommentReloadUrl = useRecoilValue(CommentReloadSelector)
  
  async function fetchFeedContents(url: string): Promise<CommentDataType[]> {
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
    const result = await fetchFeedContents(SelectoredCommentReloadUrl)
    setFeedComment(result)
  }
  
  return { reloadFetching }
}
