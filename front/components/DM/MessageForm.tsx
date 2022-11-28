import { useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"
import { MessageValueType } from "types/RoomType"

type MessageDataProps = {
  user_id?: number,
  room_id?: number
}

const MicropostForm = ({ user_id, room_id }: MessageDataProps) => {
  const create_message = process.env.NEXT_PUBLIC_BASE_URL + `messages`
  const { register, handleSubmit } = useForm<MessageValueType>()
  
  const onSubmit = async (value: MessageValueType) => {
    
    const params = {
      user_id: user_id,
      room_id: room_id,
      content: value.content
    }
    
    await axios.post(create_message, params, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res.data)
      })
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex">
        <textarea  
          id="content"
          className="h-12 border-2 dark:border-gray-700 py-1 px-2 w-full dark:bg-gray-900" 
          placeholder="メッセージを入力"
          {...register("content", { required: true })}
        >
        </textarea>
        <div className="absolute right-0 px-3 py-3 ">
          <button
            type="submit"
            className="font-medium dark:text-gray-400"
          >
            送信
          </button>
        </div>
      </div>
    </form>  
  )
}

export default MicropostForm
