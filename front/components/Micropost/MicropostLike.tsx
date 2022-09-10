import { useEffect, useState } from "react"
//import { useSWRConfig } from "swr"
//import useSWRImmutable from "swr/immutable"
//import{ MdFavoriteBorder } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import axios from "axios"
import Cookies from "js-cookie"
//import { MicropostLikeType } from "types/MicropostLikeType"

type MicropostLikeProps = {
  id: number,
  user_id: number,
  post_id: number
}

export const MicropostLike = ({ id, user_id, post_id }: MicropostLikeProps) => {
  const create_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes'
  const destroy_post_likes = process.env.NEXT_PUBLIC_BASE_URL + 'post_likes/' + id

  const [isLike, setIsLike] = useState(false)
  
  const handleLike = () => {
    const params = { user_id: user_id, post_id: post_id }
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
        }
      })
      .then((response) => {
        console.log(response)
        setIsLike(false)
      })
    }
  }
  
  return(
    <button
      className="relative"
      onClick={() => handleLike()}
    >
      { isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500 hover:text-rose-400" /> }
    </button>
  )
}

 