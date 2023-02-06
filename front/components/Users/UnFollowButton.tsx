import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"

type UnFollowProps = {
  relationship: {
    id: number,
    user_id: number,
    follow_id: number
  }
}
export const UnFollowButton = ({ relationship }: UnFollowProps) => {
  const router = useRouter()
  const un_follow_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${relationship.user_id}/relationships/${relationship.id}`
  
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
        router.reload()
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  return(
    <div className="mt-2 md:mt-4 text-center">
      <button 
        onClick={handleClick}
        className="w-5/6 md:py-1 rounded duration-200 border border-gray-600 dark:border-gary-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <h2 className="text-gray-600 dark:text-gray-400">フォローを解除する</h2>
      </button>
    </div>
  )
}
