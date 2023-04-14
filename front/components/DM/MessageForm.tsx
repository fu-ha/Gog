import { useForm } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"
import { useReloadMessage } from "hooks/useReloadMessage"
import { useReloadRoom } from "hooks/useReloadRoom"
import { MessageValueType } from "types/RoomType"

type MessageDeleteProps = {
  room_id?: number
}

const MessageForm = ({ room_id }: MessageDeleteProps) => {
  const create_message = process.env.NEXT_PUBLIC_BASE_URL + `messages`
  const { register, handleSubmit, reset } = useForm<MessageValueType>()
  const { reloadMessageFetching } = useReloadMessage()
  const { reloadRoomFetching } = useReloadRoom()
  
  const onSubmit = (value: MessageValueType) => {
    // const formData = { room_id: room_id, content: value.content}
    // const params = { user_id: user_id, room_id: room_id, content: value.content }
    const formData = new FormData()
    formData.append('content', value.content)
    
    axios.post(create_message, formData, {
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
      .then((err) => {
        console.log(err)
      })
  }
  
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex">
          <textarea  
            id="content"
            className="h-12 border-2 dark:border-gray-700 py-1 px-2 w-full dark:bg-gray-900" 
            placeholder="メッセージを入力"
            // {...register("content", { required: true })}
          >
          </textarea>
          <div className="absolute right-0 px-3 py-3 ">
            <button
              type="submit"
              className="font-medium text-gray-400 dark:text-gray-400"
            >
              送信
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default MessageForm
