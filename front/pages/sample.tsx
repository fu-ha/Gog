import { useState, useEffect } from "react"
import useSWR from "swr"
//import { useLikesCountSWR } from "hooks/useLikesSWR"
import axios from "axios"
import Cookies from "js-cookie"
import { MdFavorite } from "react-icons/md"
//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + 'users'

type props = {
  id: number
}

const sample = ({id}: props) => {
  //const post_likes_icon = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id 
  //const [users, setUsers] = useState()
  //const { post_likes_count_data } = useLikesCountSWR()
  const [isLike, setIsLike] = useState()
  
  /*const { data: post_likes_data } = useSWR(post_likes_icon, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  /*useEffect(() => {
    axios.get(baseUrl)
    .then((res) => res.data)
  }, [])*/
  
  useEffect(() => {
    if (isLike === true) {
      setIsLike(true)
    }
  }, [])
  
  return(
    //<p>ユーザー: {user_data?.user?.name}</p>  
    //<div>{post_likes_count_data?.liked_count}</div>
    //<div>[{post_likes_data?.id}, {post_likes_data?.user_id}]</div>
    <button
              onClick={() => setIsLike(true)}
            >
            { isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
            </button>
    /*{Cookies,get("access-token") && Cookies.get("client") && Cookies.get("uid") && user_data?.user?.activated && (
      <h1>{user_data.user.name}</h1>
    )}*/
  )
}

export default sample
