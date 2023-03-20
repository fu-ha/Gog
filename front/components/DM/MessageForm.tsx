import { useForm } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"
import { useReloadMessage } from "hooks/useReloadMessage"
import { useReloadRoom } from "hooks/useReloadRoom"
import { MessageValueType } from "types/RoomType"

type MessageDataProps = {
  user_id?: number,
  room_id?: number,
}

const MessageForm = ({ user_id, room_id }: MessageDataProps) => {
  const create_message = process.env.NEXT_PUBLIC_BASE_URL + `messages`
  const { register, handleSubmit, reset } = useForm<MessageValueType>()
  const { reloadMessageFetching } = useReloadMessage()
  const { reloadRoomFetching } = useReloadRoom()
  
  const onSubmit = async (value: MessageValueType) => {
    const formData = { content: value.content }
    // const params = { user_id: user_id, room_id: room_id, content: value.content }
    
    await axios.post(create_message, formData, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res.data)
        reset({ content: ''})
      })
      .then((data) => {
        console.log(data)
        reloadMessageFetching()
        reloadRoomFetching()
      })
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:relative flex fixed inset-x-0 z-20 bottom-0">
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

export default MessageForm
