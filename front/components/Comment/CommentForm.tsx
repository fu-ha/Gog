//import { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "hooks/useFlashMessage"
import { CommentFormValue } from "types/CommentType"

type CommentProps = {
  id: number
}

export const CommentForm = ({ id }: CommentProps) => {
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${id}/comments`
  const { register, handleSubmit } = useForm<CommentFormValue>()
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
    
  const onSubmit = (value: CommentFormValue) => {
    const formData = { content: value.content }
    
    axios.post(comment_url, formData, { 
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((response) => {
        console.log(response)
        //router.reload()
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .catch((error) => {
        console.log('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
  }
  
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-1">
        <div className="flex">
          <textarea 
            id="content"
            className="w-5/6 px-2 pt-1 rounded-lg resize-none shrink-0 bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-900"
            placeholder="コメントを書く"
            {...register("content", { required: true })}
          />
          <button
            className="flex md:px-5 items-center rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-900"
          >
            投稿する
          </button>
        </div>
      </form>
    </>
  )
}
