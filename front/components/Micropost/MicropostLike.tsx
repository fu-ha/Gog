import { useState, useEffect } from "react"
import useSWR from "swr"
import { useSWRConfig } from "swr"
import { MdFavorite } from "react-icons/md"
import axios from "axios"
import Cookies from "js-cookie"
import { MicropostType } from "types/MicropostType"

type MicropostLikeProps = {
  post: MicropostType,
}

type PostData = {
  id: number,
  user_id: number,
  content: string,
  created_at: string,
  post_liked: boolean,
  post_liked_count: number,
}

export const MicropostLike = ({ post }: MicropostLikeProps) => {
  const show_posts = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}`
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes` 
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${post.post_like?.id}`
  
  const { data: posts_data } = useSWR<PostData>(show_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
    //refreshInterval: 1000 
  })
  
  const { mutate } = useSWRConfig()
  
  const [isLike, setIsLike] = useState(false)
  
  const handlePostLike = async () => {
    const params = {
      user_id: post.user_id, 
      post_id: post.id, 
    }
    if (isLike === false) {
      axios.post(create_post_likes, params, {
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
      axios.delete(destroy_post_likes, {
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
    mutate(show_posts)
  }
  
  useEffect(() => {
    if (posts_data?.post_liked === true && posts_data?.post_liked_count !== 0) {
      setIsLike(true)
    }
  }, [posts_data])

  return(
    <button
      className="relative flex mr-4"
      onClick={() => handlePostLike()}
    >
      { isLike ? <MdFavorite className="md:text-xl text-rose-500" /> : <MdFavorite className="md:text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div className="ml-1">{posts_data?.post_liked_count}</div>
    </button>
  )
}
