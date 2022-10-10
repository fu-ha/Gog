//import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
//import { MicropostType } from "types/MicropostType"

type FollowProps = {
  id: number,
  followed_id: number,
  //post: MicropostType
}

export const FollowButton = ({ id, followed_id }: FollowProps) => {
  const follow_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/relationships` //`relationships` 
  
  const params = {
    followed_id: followed_id
  }
  
  const handleClick = () => {
    axios.post(follow_url, params, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        console.log(res.data)
      })
  }
  
  return(
    <div className="mt-2 md:mt-4 text-center">
      <button 
        onClick={handleClick}
        className="w-full md:py-1 rounded border border-gray-600 dark:border-gary-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gary-700 dark:hover:text-gray-200"
      >
        <h2 className="text-gray-600 dark:text-gray-400">フォローする</h2>
      </button>
    </div>
  )
}