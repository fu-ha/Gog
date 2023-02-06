import { useRecoilValue, useSetRecoilState } from 'recoil'
import { FeedRoomAtom, RoomReloadSelector, RoomDataType } from 'atom/FeedRoomAtom'
import axios from "axios"
import Cookies from "js-cookie"

type useFeedFetchType = {
  reloadRoomFetching(): Promise<void>,
}

export const useReloadRoom = (): useFeedFetchType => {
  const setFeedRoom = useSetRecoilState(FeedRoomAtom)
  const SelectoredRoomReloadUrl = useRecoilValue(RoomReloadSelector)
  
  async function fetchFeedRooms(url: string): Promise<RoomDataType[]> {
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
  
  const reloadRoomFetching = async () => {
    const result = await fetchFeedRooms(SelectoredRoomReloadUrl)
    setFeedRoom(result)
  }
  
  return { reloadRoomFetching }
}