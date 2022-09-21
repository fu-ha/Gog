import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"
//import useSWR from "swr"
//import useSWRImmutable from "swr/immutable"
//import { useRecoilValue, useRecoilState } from "recoil"
import { usePostSWR } from "hooks/usePostSWR"
import { usePostLikeSWR } from "hooks/usePostLikesSWR"
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
  liked_count: number,
  post: MicropostType
}

export const MicropostLike = ({ id, user_id, post_id, liked_icon, post_liked, liked_count, post }: MicropostLikeProps) => {
  const get_posts = process.env.NEXT_PUBLIC_BASE_URL + 'posts' 
  //const get_post_likes_count = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id 
  //const count_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id
  
  /*const { data: post_likes_data } = useSWR(get_post_likes_count, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  const { posts_data } = usePostSWR()
  
  const { post_likes_data } = usePostLikeSWR()
  
  const { mutate } = useSWRConfig()
  
  /*const { data: post_likes_data } = useSWR(get_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  const router = useRouter()
  
  //const FeedLikeNum = useRecoilValue(FeedLikeSelector)
  const [isLike, setIsLike] = useState(false)
  //const [isLike, setIsLike] = useState(id)
  //const [FeedLike, setFeedLike] = useRecoilState(FeedLikeAtom)
  //const [count, setCount] = useState(0)
  //const [count, setCount] = useRecoilState(CountLikeAtom)
  
  const handleLike = async () => {
    const params = { 
      id: id,
      user_id: user_id, 
      post_id: post_id, 
      post_liked: post_liked, /*liked_count: liked_count*/ 
    }
    if (isLike === false && !post.liked_count) {
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
        //axios(get_posts).then(res => res.data)
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
        //axios(get_posts).then(res => res.data)
      })
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    mutate(get_posts)
  }
  
  useEffect(() => {
    if (!post_likes_data || !post_likes_data?.liked_icon) return
    if (post_likes_data.liked_icon) {
        setIsLike(true)
      }
  }, [post_likes_data])
  
  return(
    <button
      className="relative flex"
      onClick={() => handleLike()}
    >
      { /*liked_icon === true*/ isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
      <div>[ {post.liked_count} ], {posts_data?.liked_count}, {post_likes_data?.user_id}</div>
    </button>
  )
}
