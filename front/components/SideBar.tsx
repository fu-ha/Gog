import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { useFlashMessage } from "../hooks/useFlashMessage"
import axios from "axios"
import Cookies from "js-cookie"
import { MdLightMode } from "react-icons/md"
import { MdModeNight } from "react-icons/md"
import { MdHome } from "react-icons/md"
import { MdPerson } from "react-icons/md"
import { MdSearch } from "react-icons/md"
import { MdOutlineChat } from "react-icons/md"
import { MdLogin } from "react-icons/md"
import { MdLogout } from "react-icons/md"

type ProfData = {
  login_user: {
    id: number
  }
}

const sign_out_url = process.env.NEXT_PUBLIC_BASE_URL + 'auth/' + 'sign_out' 

const SideBar = () => {
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  const Logout = (): void => {
    axios.delete(sign_out_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "", 
        "uid": Cookies.get("uid") || ""
      }
    })
    .then((res) => {
      console.log(res)
      Cookies.remove("access-token")
      Cookies.remove("client")
      Cookies.remove("uid")
      router.push('/')
      FlashMessage({ type: "SUCCESS", message: "ログアウトに成功" })
    })
    .catch((err) => {
      console.error('Error:', err)
      FlashMessage({ type: "DANGER", message: "ログアウトに失敗" })
    })
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
  const prof_url = process.env.NEXT_PUBLIC_BASE_URL + "users"
  const [prof, setProf] = useState<ProfData>()
  
  useEffect(() => {
    axios(prof_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setProf(res.data[0])
      })
  }, [])
  
  return(
    <div className="invisible md:visible flex-col md:flex md:flex-shrink-0 md:relative justfy-between w-0 md:w-1/3 h-screen md:pl-8 md:px-2 md:py-8">
      <div className="md:fixed flex flex-col md:w-1/4">    
        <div className="mb-1 px-3 flex justify-between items-center flex-row">
          <a className="text-3xl text-gray-600 dark:text-gray-400" href="/">Gog</a>
          <button 
            className="block p-1 bg-white dark:bg-gray-800 rounded-full focus:ring-green-500" 
            onClick={handleSetTheme}
          >
            {theme === 'light' ? <MdLightMode className="w-5 h-5 text-gray-700" /> : <MdModeNight className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
        {/*<div className="relative mt-10">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>
          <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-300 rounded-md duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-500 hover:dark:bg-gray-700" placeholder="Search"/>
        </div>*/}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href="/"
            >
              <MdHome className="w-5 h-5" />
              <span className="mx-4 font-medium">ホーム</span>
            </a>
            {//prof && prof?.map((data) => (
            <>
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href={`/users/${prof?.login_user?.id}`}
            >
              <MdPerson className="w-5 h-5" />
              <span className="mx-4 font-medium">プロフィール</span>
            </a>
            </>
           //))
            }
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href={`/search`}
            >
              <MdSearch className="w-5 h-5" />
              <span className="mx-4 font-medium">ユーザー検索</span>
            </a>
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href={`/rooms`}
            >
              <MdOutlineChat className="w-5 h-5" />
              <span className="mx-4 font-medium">DM</span>
            </a>
            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                onClick={Logout}
              >
                <MdLogout />
                <span className="mx-4 font-medium">ログアウト</span>
              </a>
            )}
            {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                href="/auth"
              >
                <MdLogin />
                <span className="mx-4 font-medium">新規登録/ログイン</span>
              </a> 
            )}
          </nav>
        </div>
      </div>    
    </div>   
  )
}

export default SideBar

