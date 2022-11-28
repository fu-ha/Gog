import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"

type FollowProps = {
  id: number,
  user_id: number,
  follow_id: number,
}

export const FollowButton = ({ id, user_id, follow_id }: FollowProps) => {
  const router = useRouter()
  const follow_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/relationships` 

  const params = {
    user_id: user_id,
    follow_id: follow_id, 
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
        //router.reload()
        console.log("Follow", res.data)
      })
  }
  
  return(
    <div className="mt-2 md:mt-4 text-center">
      <button 
        onClick={handleClick}
        className="w-5/6 md:py-1 rounded duration-200 border border-gray-600 dark:border-gary-400 hover:bg-blue-200 dark:hover:bg-blue-700"
      >
        <h2 className="text-gray-600 dark:text-gray-400">フォローする</h2>
      </button>
    </div>
  )
}
