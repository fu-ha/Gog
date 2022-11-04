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
  //post_liked: boolean,
  post: MicropostType,
}

type PostData = {
  id: number,
  user_id: number,
  post_id: number,
  content: string,
  liked_count: number,
  post_liked: boolean
}

type PostLikeData = {
  id: number,
  user_id: number,
  post_id: number,
  //liked_icon: boolean
}

type LoginUserData = {
  id: number,
}

export const MicropostLike = ({ id, post, /*post_likes_id,*/ user_id, post_id, /*post_liked*/ }: MicropostLikeProps) => {
  const get_posts = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  const show_posts = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}`
  //const post_likes_url = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${post.post_like?.id}` //`post_likes/${post_likes_id}` 
  const get_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes` 
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes` 
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + `post_likes/${post.post_like?.id}` //`post_likes/${post_likes_id}`
  const login_user = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/login_user`
  
  const { data: posts_data } = useSWR<PostData>(show_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
  //const { data: post_likes_data } = useSWR<PostLikeData>(post_likes_url, { 
    //revalidateIfStale: false, revalidateOnFocus: false
  //})
  
  const { data: login_user_data } = useSWR<LoginUserData>(login_user, { 
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
  const { mutate } = useSWRConfig()
  //const { data } = useSWRImmutable(show_posts)
  
  //const router = useRouter()
  const [isLike, setIsLike] = useState(false)
  
  const handleLike = async () => {
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
  
  //useEffect(() => {
    /*if (post.post_liked === true) {
      if (post_likes_data?.user_id == login_user_data?.id) {
        setIsLike(true)
      } else{
        return
      }
    } else {
      return
    }*/
    //if (posts_data?.post_liked === true && post_likes_data?.user_id === login_user_data?.id) {
    //  setIsLike(true)
    //} else {
    ///  return
    //}
  //}, [posts_data?.post_liked])
  
  
  /*const [micropost, setMicropost] = useState<PostData>()
  useEffect(() => {
    axios(get_posts, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setMicropost(res.data)
      })
  }, [])*/
  
  /*useEffect(() => {
    if (post.liked_count !== 0) {
      setIsLike(true)
    }
  }, [post])*/
  
  useEffect(() => {
    if (post.liked_count !== 0) {
      setIsLike(true)
    }
  }, [post.liked_count])

  return(
    <button
      className="relative flex"
      onClick={() => handleLike()}
    >
      { isLike ? <MdFavorite className="md:text-xl text-rose-500" /> : <MdFavorite className="md:text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div>count: {posts_data?.liked_count/*post.liked_count*/}, loginUser: {login_user_data?.id}, likesUserId: {/*post_likes_data?.user_id*/}, {user_id}, PostLiked: {/*posts_data?.post_liked*/}</div>
    </button>
  )
}
