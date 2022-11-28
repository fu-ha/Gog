//import { useEffect } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useSWRConfig } from "swr"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "hooks/useFlashMessage"
import { CommentFormValue } from "types/CommentType"
import { MicropostType } from "types/MicropostType"

type CommentProps = {
  post: MicropostType,
  id: number
}

type CommentData = {
  
}

export const CommentForm = ({ id, post }: CommentProps) => {
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments`
  //const show_comment_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments/${id}`
  const { mutate } = useSWRConfig()
  //const { data: comments_data } = useSWR<CommentData>(comment_url, {
    //revalidateIfStale: false, revalidateOnFocus: false,
    //refreshInterval: 1000 
  //})
  const { register, handleSubmit } = useForm<CommentFormValue>()
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
    
  const onSubmit = async (value: CommentFormValue) => {
    const formData = { content: value.content }
    //const params = { post_id: post.id, content: content }
    
    axios.post(comment_url, formData, { 
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res)
        //router.reload()
        //mutate(show_comment_url)
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .catch((error) => {
        console.log('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
    //await new Promise(resolve => setTimeout(resolve, 500))
    //mutate(comment_url)
  }
  
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-1">
        <div className="flex">
          <textarea 
            id="content"
            className="w-5/6 px-2 pt-1 rounded-lg resize-none shrink-0 duration-200 bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800"
            placeholder="コメントを書く"
            {...register("content", { required: true })}
          />
          <button
            type="submit"
            className="flex md:px-5 items-center rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800"
          >
            投稿する
          </button>
        </div>
      </form>
    </>
  )
}
