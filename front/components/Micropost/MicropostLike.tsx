import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
import { useTheme } from "next-themes"
//import useSWRImmutable from "swr/immutable"
//import { useRecoilValue, useRecoilState } from "recoil"
import { usePostSWR } from "hooks/usePostSWR"
import { PostsData } from "hooks/usePostSWR"
//import { usePostLikeSWR } from "hooks/usePostLikesSWR"
import { MdFavorite } from "react-icons/md"
import axios from "axios"
import Cookies from "js-cookie"
import { MicropostType } from "types/MicropostType"

type MicropostLikeProps = {
  id: number, 
  user_id: number, 
  post_id: number, 
  post_liked: boolean,
  liked_icon: boolean,
  post: MicropostType
}

export const MicropostLike = ({ id, user_id, post_id, liked_icon, post_liked, post }: MicropostLikeProps) => {
  const get_posts = process.env.NEXT_PUBLIC_BASE_URL + 'posts' 
  //const get_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'posts_likes' 
  const get_post_likes_count = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id 
  const post_likes_icon = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id 
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id
  
  //const { posts_data } = usePostSWR<PostsData>()
  const { data: posts_data } = useSWR(get_post_likes_count//, {
    //revalidateIfStale: false, revalidateOnFocus: false
  //}
  )
  
  //const { post_likes_data } = usePostLikeSWR()
  /*const { data: post_likes_data } = useSWR(post_likes_icon, { 
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  const { mutate } = useSWRConfig()
  
  /*const { data: post_likes_data } = useSWR(get_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  //const router = useRouter()
  
  //const FeedLikeNum = useRecoilValue(FeedLikeSelector)
  const [isLike, setIsLike] = useState(false)
  //const [isLike, setIsLike] = useState()
  //const [isLike, setIsLike] = useState(id)
  //const [FeedLike, setFeedLike] = useRecoilState(FeedLikeAtom)
  //const [count, setCount] = useState(0)
  //const [count, setCount] = useRecoilState(CountLikeAtom)
  
  const handleLike = async () => {
    const params = { 
      id: id,
      user_id: user_id, 
      post_id: post_id, 
      post_liked: post_liked,  
      liked_icon: liked_icon
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
  
  useEffect(() => {
    if (!posts_data || !posts_data.liked_icon) return
    if (posts_data.liked_icon) {
      //axios(get_post_likes).then((res) => res.data)
      setIsLike(true)
    }
  }, [posts_data])
  
  return(
    <button
      className="relative flex"
      onClick={() => handleLike()}
    >
      { isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div>{posts_data?.liked_count}</div>
    </button>
  )
}
