import { useRouter } from "next/router"
import { useFlashMessage } from "../../hooks/useFlashMessage"
import axios from "axios" 
import Cookies from "js-cookie"
import { MdDelete } from "react-icons/md"

type MicropostDeleteProps = {
  id: number
}

export const MicropostDelete = ({ id }: MicropostDeleteProps) => {
  const post_delete = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id 
  const router = useRouter()
  const { FlashMessage } = useFlashMessage()
  
  const Post_Delete = async() => {
    await axios.delete(post_delete, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res)
        router.reload()
        FlashMessage({ type: "SUCCESS", message: "投稿を削除しました" })
      })
      .catch((error) => {
        console.log(error)
        FlashMessage({ type: "DANGER", message: "投稿を削除できませんでした" })
      })
  }
  
  return(
    <>
      <button
        className="flex px-4 py-2"
        onClick={Post_Delete}
      >
        <span className="text-lg"><MdDelete /></span>
        <span className="pl-2 text-sm">投稿を削除</span>
      </button>
    </>
  )
}