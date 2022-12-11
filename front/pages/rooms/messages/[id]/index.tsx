import { useState, useEffect } from "react"
import { useRouter } from "next/router"
//import { useFlashMessage } from "hooks/useFlashMessage"
import axios from "axios"
import Cookies from "js-cookie"
import Layout from "components/Layout"
import RoomsCmp from "components/DM/RoomsCmp"
import MessageForm from "components/DM/MessageForm"
import MessageDelete from "components/DM/MessageDelete"
import { MdMoreHoriz } from "react-icons/md"
import { MdKeyboardArrowLeft } from "react-icons/md"
//import { RoomDataType } from "types/RoomType"
import moment from "moment"
import "moment/locale/ja"

type RoomDataType = {
  other_user: {
    id: number,
    name: string
  },
  login_user: {
    id: number,
    name: string
  }
}

type MessageDataType = {
  id: number,
  user_id: number,
  room_id: number,
  content: string,
  created_at: string
}

const Messages = () => {
  //const { FlashMessage } = useFlashMessage()
  const router = useRouter()
  const { id } = router.query
  const room_url = process.env.NEXT_PUBLIC_BASE_URL + `rooms/${id}`
  const [roomData, setRoomData] = useState<RoomDataType>()
  const [message, setMessage] = useState<MessageDataType[]>()
  
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
        setMessage(res.data.message)
      })
  }, [id])
  
  return(
    <Layout>
      <div className="rounded-sm white dark:bg-gray-900">
        <div className="flex h-screen border-x-2 dark:border-gray-700 lg:grid lg:grid-cols-12 ">
          <div className="flex flex-col hidden md:inline-block md:px-3 md:py-2 col-span-4 bg-gray-100 dark:bg-gray-800">
            <RoomsCmp />
          </div>
          
          <div className="flex flex-col w-full inset-y-0 col-span-8 white dark:bg-gray-900">
            <div className="flex items-center justify-between px-3 md:px-5 py-2 md:py-3 border-b-2 dark:border-gray-700">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="md:hidden inline-block flex justify-center items-center text-2xl px-1">
                    <MdKeyboardArrowLeft />
                  </div>
                  <div className="rounded-circle pl-2 pr-1">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                      alt="avatar"
                    />
                  </div>
                  <p className="flex justify-center items-center font-medium px-2">{roomData?.other_user.name}</p>
                </div>
              </div>
              <div className="relative inline-block">
                <MdMoreHoriz />
              </div>
            </div>
            <div className="grow overflow-auto">
              {message && message.map((data: MessageDataType) => (
                <>
                  {data.user_id == roomData?.other_user.id ? (
                    <div className="flex justify-start my-3">
                      <div className="max-w-3/4 ml-5">
                        <div className="group break-all white-pre-line rounded-full bg-gray-100 dark:bg-gray-600">
                          <p className="py-2 md:py-3 px-3 md:px-5">{data.content}</p>
                        </div>
                        <div className="mt-1 text-xs text-gray-400 text-left">{moment(data.created_at).fromNow()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end my-3">
                      <div className="max-w-3/4 mr-5">
                        <div className="relative group break-all whitespace-pre-line rounded-full bg-gray-100 dark:bg-gray-600">
                          <p className="py-2 md:py-3 px-3 md:px-5">{data.content}</p>
                          <div className="absolute -left-4 -bottom-1 hidden group-hover:flex">
                            <MessageDelete id={data.id} />
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-400 text-right">{moment(data.created_at).fromNow()}</div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
            <MessageForm user_id={roomData?.login_user.id} room_id={id} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Messages