import { useState, useEffect } from "react"
import { useLikesCountSWR } from "hooks/useLikesSWR"
import axios from "axios"
import Cookies from "js-cookie"

//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + 'users'

const sample = () => {
  //const [users, setUsers] = useState()
  const { post_likes_count_data } = useLikesCountSWR()
  
  /*useEffect(() => {
    axios.get(baseUrl)
    .then((res) => res.data)
  }, [])*/
  
  return(
    //<p>ユーザー: {user_data?.user?.name}</p>  
    <div>{post_likes_count_data?.liked_count}</div>
    /*{Cookies,get("access-token") && Cookies.get("client") && Cookies.get("uid") && user_data?.user?.activated && (
      <h1>{user_data.user.name}</h1>
    )}*/
  )
}

export default sample
