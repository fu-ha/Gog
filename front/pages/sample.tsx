import { useState, useEffect } from "react"
import { useUserSWR } from "hooks/useUserSWR"
import axios from "axios"
import Cookies from "js-cookie"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + 'users'

const sample = () => {
  //const [users, setUsers] = useState()
  const { user_data } = useUserSWR()
  
  useEffect(() => {
    axios.get(baseUrl)
    .then((res) => res.data)
  }, [])
  
  return(
    //<p>ユーザー: {user_data?.user?.name}</p>  
    <ul>
      hhh
    </ul>
    /*{Cookies,get("access-token") && Cookies.get("client") && Cookies.get("uid") && user_data?.user?.activated && (
      <h1>{user_data.user.name}</h1>
    )}*/
  )
}

export default sample
