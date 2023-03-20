import { useRouter } from "next/router"
import axios from "axios" 
import Cookies from "js-cookie"
import { MdDelete } from "react-icons/md"

type RoomDeleteProps = {
  id?: number
}

const RoomDelete = ({ id }: RoomDeleteProps) => {
  const room_delete = process.env.NEXT_PUBLIC_BASE_URL + 'rooms/' + id 
  const router = useRouter()
  
  const Room_Delete = async () => {
    await axios.delete(room_delete, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        router.push('/rooms')
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  return(
    <button
      className="flex px-4 py-2"
      onClick={Room_Delete}
    >
      <span className="text-lg"><MdDelete /></span>
      <span className="pl-2 text-sm">投稿を削除</span>
    </button>
  )
}

export default RoomDelete