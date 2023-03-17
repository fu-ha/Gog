import { useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import Cookies from "js-cookie"
import { useRecoilState } from "recoil"
import { FeedRoomAtom } from "atom/FeedRoomAtom"
import moment from "moment"
import "moment/locale/ja"

const RoomsCmp = () => {
  const rooms_url = process.env.NEXT_PUBLIC_BASE_URL + "rooms"
  const [FeedRoom, setFeedRoom] = useRecoilState(FeedRoomAtom)
  
  const handleGetRoom = async () => {
    await axios(rooms_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setFeedRoom(res.data)
      })
  }
  
  useEffect(() => {
    handleGetRoom()
  }, [])
  
  return(
    <>
      {FeedRoom && FeedRoom.map((data) => (
        <Link href={`/rooms/messages/${data.room.id}`}>
          <div className="flex px-2 md:px-2 py-3 md:py-3">
            <div className="shrink-0 rounded-circle mr-2">
              <img
                className="object-cover w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
            </div>
            <div className="flex grow justify-between truncate">
              <div className="flex flex-col truncate">
                <p className="text-base truncate dark:text-gray-300">{data.other_user?.name}</p>
                <p className="text-sm truncate dark:text-gray-400">{data.last_message?.content}</p>
              </div>
              <div className="flex flex-col shrink-0 text-sm dark:text-gray-400">
                <p>{moment(data.last_message?.created_at).fromNow()}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default RoomsCmp