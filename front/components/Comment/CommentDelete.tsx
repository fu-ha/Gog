import { useRouter } from "next/router"
import { useFlashMessage } from "hooks/useFlashMessage"
import axios from "axios" 
import Cookies from "js-cookie"
import { MdDelete } from "react-icons/md"
import { MicropostType } from "types/MicropostType"

type CommentDeleteProps = {
  id: number,
  post: MicropostType
}

export const CommentDelete = ({ id, post }: CommentDeleteProps) => {
  const comment_delete = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments/${id}`
  const router = useRouter()
  const { FlashMessage } = useFlashMessage()
  
  const Comment_Delete = async() => {
    await axios.delete(comment_delete, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((response) => {
        console.log(response)
        router.reload()
        FlashMessage({ type: "SUCCESS", message: "コメントを削除しました" })
      })
      .catch((error) => {
        console.log(error)
        FlashMessage({ type: "DANGER", message: "コメントを削除できませんでした" })
      })
  }
  
  
  
  return(
    <>
      <button
        className="flex px-4 py-2"
        onClick={Comment_Delete}
      >
        <span className="text-lg"><MdDelete /></span>
        <span className="pl-2 text-sm">コメントを削除</span>
      </button>
    </>  
  )
}