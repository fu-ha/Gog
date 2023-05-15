import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { MdDelete } from "react-icons/md"

type MessageDeleteProps = {
  id: number
}

const MessageDelete = ({ id }: MessageDeleteProps) => {
  const message_destroy = process.env.NEXT_PUBLIC_BASE_URL + `messages/${id}`
  const router = useRouter()
  
  const Message_Delete = () => {
    axios.delete(message_destroy, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })  
      .then((res) => {
        console.log(res.data)
        router.reload()
      })
  }
  
  return(
    <button
      className="flex items-center text-gray-400"
      onClick={Message_Delete}
    >
      <MdDelete />
    </button>
  )
}

export default MessageDelete