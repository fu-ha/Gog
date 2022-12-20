import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedProfileAtom, ProfileReloadSelector, ProfileDataType } from 'atom/FeedProfileAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadFetching(): Promise<void>,
}

export const useReloadProfile = (): useFeedFetchType => {
  const setFeedProfile = useSetRecoilState(FeedProfileAtom)
  const SelectoredProfileReloadUrl = useRecoilValue(ProfileReloadSelector)
  
  async function fetchFeedProfiles(url: string): Promise<ProfileDataType[]> {
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
    const result = await fetchFeedProfiles(SelectoredProfileReloadUrl)
    setFeedProfile(result)
  }
  
  return { reloadFetching }
}