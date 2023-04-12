import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"

type FollowProps = {
  user_id: number,
  follow_id: number,
}

export const FollowButton = ({ user_id, follow_id }: FollowProps) => {
  const follow_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${user_id}/relationships` 
  const router = useRouter()

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
        router.reload()
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  return(
    <div className="mt-5 md:mt-8 text-center">
      <button 
        onClick={handleClick}
        data-testid="follow-button"
        className="w-5/6 md:py-1 rounded duration-200 border border-gray-600 dark:border-gary-400 hover:bg-blue-400 dark:hover:bg-blue-600"
      >
        <h2 className="text-gray-600 dark:text-gray-400">フォローする</h2>
      </button>
    </div>
  )
}
