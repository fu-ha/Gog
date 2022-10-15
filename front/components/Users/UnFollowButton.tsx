import axios from "axios"
import Cookies from "js-cookie"
//import { FollowType } from "types/FollowType"

type UnFollowProps = {
  id: number,
  relationship: {
    id: number,
    user_id: number,
    follow_id: number
  }
}
export const UnFollowButton = ({ id, relationship }: UnFollowProps) => {
  const un_follow_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/relationships/${relationship.id}` //`relationships/${relationship.id}`  //useStateでuser.id, relationship.id分ける！
  
  const params = {
    user_id: relationship.user_id,
    follow_id: relationship.follow_id,
  }
  
  const handleClick = () => {
    axios.delete(un_follow_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      },
      params
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
        <h2 className="text-gray-600 dark:text-gray-400">フォローを解除する</h2>
      </button>
    </div>
  )
}