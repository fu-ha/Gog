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
  
  //const { mutate } = useSWRConfig()

  const [isLike, setIsLike] = useState(false)
  
  /*const accessToken = Cookies.get("access-token") || ""
  const client = Cookies.get("client") || ""
  const uid = Cookies.get("uid") || ""*/
  
  const handleLike = () => {
    const params = { user_id: user_id, post_id: post_id }
    if (isLike === false) {
      axios.post(create_post_likes, params, {
      //fetch(create_post_likes, {
        //method: 'POST',
        headers: {
          /*'access-token': accessToken,
          'client': client,
          'uid': uid*/
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || "",
        }
      })
      .then((response) => {
        console.log(response)
        setIsLike(true)
        //return response.json()
        //return response.data
        //if (!response.ok) return
        /*if (res.status == 200) {
          setIsLike(true)
        } else {
          return
        }*/
     }).catch((error) => { console.log(error)})
    } else {
      axios.delete(destroy_post_likes, {
      //fetch(destroy_post_likes, {
        //method: 'DELETE',
        headers: {
          /*'access-token': accessToken,
          'client': client,
          'uid': uid*/
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || "",
        }
      })
      .then((response) => {
        console.log(response)
        setIsLike(false)
        //return response.json()
        //return response.data
        /*if (res.status == 200) {
          setIsLike(false)
        } else {
          return
        }*/
      }).catch((error) => { console.log(error)})
    }
  }
  
  return(
    <button
      className="relative"
      onClick={() => handleLike()}
    >
      {isLike ? <MdFavorite className="text-xl text-rose-500" /> : <MdFavorite className="text-xl text-gray-300 dark:text-gray-500" /> }
    </button>
  )
}

 