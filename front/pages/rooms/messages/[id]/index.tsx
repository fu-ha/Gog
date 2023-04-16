import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import axios from "axios"
import Cookies from "js-cookie"
import { useRecoilState } from "recoil"
import { FeedMessageAtom } from "atom/FeedMessageAtom"
// import { FeedRoomAtom } from "atom/FeedRoomAtom"
import Layout from "components/Layout"
import RoomsCmp from "components/DM/RoomsCmp"
import MessageForm from "components/DM/MessageForm"
import MessageDelete from "components/DM/MessageDelete"
import RoomDelete from "components/DM/RoomDelete"
import { MdMoreHoriz } from "react-icons/md"
import { MdKeyboardArrowLeft } from "react-icons/md"
// import { RoomDataType } from "types/RoomType"
import moment from "moment"
import "moment/locale/ja"

type RoomDataType = {
  room: {
    id: number
  },
  other_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  },
  login_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  }
}

// type MessageDataType = {
//   id: number,
//   user_id: number,
//   room_id: number,
//   content: string,
//   created_at: string
// }

const Messages = () => {
  const router = useRouter()
  const { id } = router.query
  const room_url = process.env.NEXT_PUBLIC_BASE_URL + `rooms/${id}`
  const [roomData, setRoomData] = useState<RoomDataType>()
  // const [FeedRoom, setFeedRoom] = useRecoilState(FeedRoomAtom)
  /* { reloadMessageFetching } を使う場合recoilを用いてるのでここでもrecoilで状態を定義する必要がある。*/
  // const [message, setMessage] = useState<MessageDataType[]>()
  const [FeedMessage, setFeedMessage] = useRecoilState(FeedMessageAtom)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios(room_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setRoomData(res.data)
        // setFeedRoom(res.data)
        // setMessage(res.data.message)
        setFeedMessage(res.data.message)
      })
  }, [id])
  
  return(
    <Layout>
      <div className="rounded-sm white  dark:bg-gray-900">
        <div className="flex inset-x-0 fixed md:relative h-screen  md:border-x-2 md:dark:border-gray-700 lg:grid lg:grid-cols-12 ">
          <div className="flex flex-col hidden md:inline-block md:overflow-hidden md:px-3 md:py-2 col-span-4 bg-gray-100 dark:bg-gray-800">
            <RoomsCmp />
          </div>
          
          <div className="flex flex-col w-full md:col-span-8 white dark:bg-gray-900">
            <div className="flex h-14 md:h-16  items-center justify-between px-3 md:px-5 py-2 md:py-3 sticky top-0 border-b-2 dark:border-gray-700">
                <div className="flex flex-col">
                  <div className="flex">
                      <div className="md:hidden inline-block flex justify-center items-center text-2xl px-1">
                        <Link href={`/rooms`}>
                          <MdKeyboardArrowLeft />
                        </Link>
                      </div>
                      <Link href={`/users/${roomData?.other_user?.id}`}>
                        <div className="rounded-circle pl-2 pr-1">
                          {roomData?.other_user?.image?.url ? (
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={roomData?.other_user?.image?.url}
                              alt="avatar"
                            />
                          ) : (
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                              alt="avatar"
                            />
                          )}
                        </div>
                      </Link>
                      <p className="flex justify-center items-center font-medium px-2">{/*FeedRoom.other_user.name*/roomData?.other_user?.name}</p>
                  </div>
                </div>
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-lg rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <MdMoreHoriz />
                </button>
                <div>
                  {isOpen && (
                    <div className="absolute z-10 right-0 w-40 rounded-md shadow-lg bg-gray-300 dark:bg-gray-700">
                      <RoomDelete id={roomData?.room.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grow overflow-y-scroll md:h-32 pb-10 md:pb-0 mb-10 md:mb-0">
              {FeedMessage && FeedMessage.map((data) => ( //message && message.map((data: MessageDataType) => ( 
                <>
                  {data.user_id == roomData?.other_user?.id ? (
                    <div className="flex justify-start my-3 md:my-5">
                      <div className="max-w-3/4 ml-5 md:ml-8">
                        <div className="group break-all white-pre-line rounded-full bg-gray-100 dark:bg-gray-600">
                          <p className="py-2 md:py-3 px-3 md:px-5">{data.content}</p>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 text-left">{moment(data.created_at).fromNow()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end my-3 md:my-5">
                      <div className="max-w-3/4 mr-5 m:ml-8">
                        <div className="relative group break-all whitespace-pre-line rounded-full bg-gray-100 dark:bg-gray-600">
                          <p className="py-2 md:py-3 px-3 md:px-5">{data.content}</p>
                          <div className="absolute -left-4 -bottom-1 hidden group-hover:flex">
                            <MessageDelete id={data.id} />
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 text-right">{moment(data.created_at).fromNow()}</div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>

        　   {roomData && (
        　   //sticky bottom-0 でもいいか。
              <div className="md:relative fixed inset-x-0 bottom-0">
                <MessageForm room_id={roomData.room.id} />
              </div>
        　   )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Messages
