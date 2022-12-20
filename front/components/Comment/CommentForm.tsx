//import { useEffect } from "react"
// import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "hooks/useFlashMessage"
import { useReloadComment } from "hooks/useReloadComment"
import { CommentFormValue } from "types/CommentType"
import { MicropostType } from "types/MicropostType"
// import { useRecoilValue, useSetRecoilState } from "recoil"
// import { FeedCommentAtom, CommentReloadSelector, CommentDataType } from "../../atom/FeedCommentAtom"

type CommentProps = {
  post: MicropostType,
  id: number,
  post_id: number
  //post_id: CommentDataType
}

export const CommentForm = ({ post }: CommentProps) => {
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments`
  const { register, handleSubmit, reset } = useForm<CommentFormValue>()
  const { FlashMessage } = useFlashMessage()
  // const router = useRouter()
  const { reloadFetching } = useReloadComment()
  
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
        reset({ content: ''})
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .then((data) => {
        console.log(data)
        reloadFetching()
      })
      .catch((error) => {
        console.log('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
  }
  
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="flex justify-between">
          <textarea 
            id="content"
            className="w-5/6 px-2 pt-1 rounded-lg resize-none shrink-0 duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-800"
            placeholder="コメントを書く"
            {...register("content", { required: true })}
          />
          <button
            type="submit"
            className="flex px-3 items-center rounded-lg text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-800"
          >
            投稿する
          </button>
        </div>
      </form>
    </>
  )
}
