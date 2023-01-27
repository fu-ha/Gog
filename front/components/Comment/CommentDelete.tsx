import axios from "axios" 
import Cookies from "js-cookie"
import { useFlashMessage } from "hooks/useFlashMessage"
import { useReloadComment } from "hooks/useReloadComment"
import { MdDelete } from "react-icons/md"
import { MicropostType } from "types/MicropostType"

type CommentDeleteProps = {
  id: number,
  post: MicropostType
}

export const CommentDelete = ({ id, post }: CommentDeleteProps) => {
  const comment_delete = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments/${id}`
  const { FlashMessage } = useFlashMessage()
  const { reloadCommentFetching } = useReloadComment()
  
  const Comment_Delete = async () => {
    await axios.delete(comment_delete, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res)
        FlashMessage({ type: "SUCCESS", message: "コメントを削除しました" })
      })
      .then((data) => {
        console.log(data)
        reloadCommentFetching()
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