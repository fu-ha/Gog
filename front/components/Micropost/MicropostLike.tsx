import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
//import useSWRImmutable from "swr/immutable"
//import { useRecoilValue, useRecoilState } from "recoil"
import { MdFavorite } from "react-icons/md"
import axios from "axios"
import Cookies from "js-cookie"
import { MicropostType } from "types/MicropostType"

type MicropostLikeProps = {
  id: number, 
  user_id: number, 
  post_id: number, 
  post_liked: boolean,
  post: MicropostType
}

type PostData = {
  id: number,
  user_id: number,
  post_id: number,
  content: string,
  liked_count: number
}

type PostLikeData = {
  id: number,
  user_id: number,
  post_id: number,
  post_liked: boolean
}

export const MicropostLike = ({ post }: MicropostLikeProps) => {
  const get_posts = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  const show_posts = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}`
  const post_likes_url = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${post.post_like?.id}`
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes` 
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${post.id}`
  
  const { data: posts_data } = useSWR<PostData>(show_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
  const { data: post_likes_data } = useSWR<PostLikeData>(post_likes_url, { 
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
  const { mutate } = useSWRConfig()
  //const { data } = useSWRImmutable(show_posts)
  
  //const router = useRouter()
  const [isLike, setIsLike] = useState(false)
  
  const handleLike = async () => {
    const params = { 
      user_id: post.post_like.user_id, 
      post_id: post.post_like.post_id, 
      post_liked: post.post_like.post_liked
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
    mutate(get_posts)
  }
  
  /*useEffect(() => {
    if (post_likes_data?.post_liked === false) {
      return
    } else {
      setIsLike(true)
    }
  }, [post_likes_data])*/
  
  /*useEffect(() => {
    axios(post_likes_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setIsLike(res.data)  
      })
  }, [])*/
  
  return(
    <button
      className="relative flex"
      onClick={() => handleLike()}
    >
      { isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div>{posts_data?.liked_count} {posts_data?.liked_count} {post_likes_data?.id}</div>
    </button>
  )
}
