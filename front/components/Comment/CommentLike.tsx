import { useState, useEffect } from "react"
import useSWR from "swr"
import { useSWRConfig } from "swr"
import { MdFavorite } from "react-icons/md"
import axios from "axios"
import Cookies from "js-cookie"
import { MicropostType } from "types/MicropostType"

type CommentLikeProps = {
  post: MicropostType,
  comment: {
    id: number,
    user_id: number,
    post_id: number,
    comment_like: {
      id: number,
      user_id: number,
      post_id: number,
      comment_id: number
    }
    //comment_liked_count: number
  }
}

type CommentData = {
  id: number,
  user_id: number,
  post_id: number,
  content: string,
  comment_liked: boolean,
  comment_liked_count: number,
}

export const CommentLike = ({ post, comment }: CommentLikeProps) => {
  const show_comments = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments/${comment.id}`
  const create_comment_likes = process.env.NEXT_PUBLIC_BASE_URL + `comment_likes` 
  const destroy_comment_likes = process.env.NEXT_PUBLIC_BASE_URL + `comment_likes/${comment.comment_like?.id}`
  
  const { data: comments_data } = useSWR<CommentData>(show_comments, {
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
  const { mutate } = useSWRConfig()
  
  const [isLike, setIsLike] = useState(false)
  
  const handleCommentLike = async () => {
    const params = { 
      user_id: comment.user_id, 
      post_id: comment.post_id, 
      comment_id: comment.id
    }
    if (isLike === false) {
      axios.post(create_comment_likes, params, {
        headers: {
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || "",
        }
      })
      .then((response) => {
        console.log(response)
        setIsLike(true)
     })
    } else {
      axios.delete(destroy_comment_likes, {
        headers: {
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || "",
        },
        params
      })
      .then((response) => {
        console.log(response)
        setIsLike(false)
      })
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    mutate(show_comments)
  }
  
  useEffect(() => {
    if (comments_data?.comment_liked === true && comments_data?.comment_liked_count !== 0) {
      setIsLike(true)
    }
  }, [comments_data])
  
  return(
    <button
      className="relative flex"
      onClick={() => handleCommentLike()}
    >
      { isLike ? <MdFavorite className="md:text-xl text-rose-500" /> : <MdFavorite className="md:text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div className="ml-1">{comments_data?.comment_liked_count}</div>
    </button>
  )
}
