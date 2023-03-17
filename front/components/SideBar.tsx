import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { useFlashMessage } from "../hooks/useFlashMessage"
import axios from "axios"
import Cookies from "js-cookie"
import { MdLightMode } from "react-icons/md"
import { MdModeNight } from "react-icons/md"
import { AiOutlineMenu } from "react-icons/ai"
import { MdClear } from "react-icons/md"
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
  const [isOpen, setIsOpen] = useState(false)

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
      // switch (err.response?.status) {
      //   case 404:
      //     router.push('/auth')
      // }
      if (err.response?.status === 404) {
        router.push('/auth')
      }
      console.error('Error:', err)
      FlashMessage({ type: "DANGER", message: "ログアウトに失敗" })
    })
  }
  
  const prof_url = process.env.NEXT_PUBLIC_BASE_URL + "users"
  const [prof, setProf] = useState<ProfData>()
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
    
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
    <>
    <div className="md:invisible visible z-20 fixed inset-x-0 top-0 flex-col">
      <nav className="h-14 border-b border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-900">
        <div className="static float-right items-center justify-center">
          <button
            className="p-5 text-gray-300"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </nav>
    </div>
    {isOpen === true && (
      <div className="fixed inset-0 flex z-30 md:invisible visible">
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
        <div className="fixed inset-0">
          <div aria-hidden="true" className="absolute inset-0 bg-gray-600 opacity-75 dark:bg-gray-900">
          </div>
        </div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 overflow-auto">
          <nav className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            {/*<div className="absolute flex-shrink-0 left-6 top-8 flex space-x-2 items-center">
              <button type="button" className=" items-center focus:ring-2 text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-700 dark:hover:text-gray-300">
              　Gog
              </button>
            </div>*/}
            <div className="flex-shrink-0 px-3 justify-between items-center flex">
              <div className="flex-shink-0 pl-2">
                <button className="text-3xl focus:ring-2 text-gray-600 dark:text-gray-400">
                  Gog
                </button>
              </div>
              <div className="relative bg-transparent dark:bg-transparent cursor-pointer">
                <button
                  className="p-2 float-right text-gray-600 dark:text-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  <MdClear className="text-xl" />
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 px-4 py-2">
              <button 
                className="float-right p-1 bg-white dark:bg-gray-800 rounded-full focus:ring-green-500" 
                onClick={handleSetTheme}
              >
                {theme === 'light' ? <MdLightMode className="w-5 h-5 text-gray-700" /> : <MdModeNight className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            <nav className="flex-1 px-3 space-y-3.5 mt-8">
              <a 
                className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                href="/"
              >
                <MdHome className="w-5 h-5" />
                <span className="mx-4 font-medium">ホーム</span>
              </a>
              
              {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
                <a 
                  className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                  href={`/users/${prof?.login_user?.id}`}
                >
                  <MdPerson className="w-5 h-5" />
                  <span className="mx-4 font-medium">プロフィール</span>
                </a>
              )}
              {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
                <a 
                  className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                  href='#'
                >
                  <MdPerson className="w-5 h-5" />
                  <span className="mx-4 font-medium">プロフィール</span>
                </a>
              )}
              
              <a 
                className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                href={`/search`}
              >
                <MdPerson className="w-5 h-5" />
                <span className="mx-4 font-medium">ユーザー検索</span>
              </a>
              
              {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
                <a 
                  className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                  href={`/rooms`}
                >
                  <MdPerson className="w-5 h-5" />
                  <span className="mx-4 font-medium">DM</span>
                </a>
              )}
              {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
                <a 
                  className="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
                  href='#'
                >
                  <MdPerson className="w-5 h-5" />
                  <span className="mx-4 font-medium">DM</span>
                </a>
              )}
            </nav>
          </nav>
          {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
            <a 
              className="flex items-center px-4 py-2 my-5 stransition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
              onClick={Logout}
            >
              <MdLogout />
              <span className="mx-4 font-medium">ログアウト</span>
            </a>
          )}
          {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
            <a 
              className="flex items-center px-4 py-2 my-5 transition-colors duration-200 transform rounded-md text-gray-600 dark:text-gray-400" 
              href="/auth"
            >
              <MdLogin />
              <span className="mx-4 font-medium">ログイン / 新規登録</span>
            </a> 
          )}
        </div>
      </div>
      <div className="flex-shrink-0 w-14"></div>
    </div>
    )}
    {/*<div className="md:invisible visible z-20 fixed inset-x-0 top-0 ">
      <nav className="h-14 border-b border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-900">
        <div className="static float-right items-center justify-center">
          <button
            className="p-5 text-gray-300"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
          <div>
            {isOpen && (
              <div className="flex inset-0 fixed z-30 w-3/4 h-full bg-gray-200 dark:bg-gray-800">
                <div className="relative flex-1 flex flex-col max-w-xs w-full overflow-auto bg-gray-200 dark:bg-gray-800">
                  <div className="relative flex-1 flex flex-col max-w-xs w-full overflow-auto bg-gray-200 dark:bg-gray-800">
                    <nav className="flex-1 h-0 pt-5 pb-4 overflow-auto">
                      
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>*/}
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
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href="/"
            >
              <MdHome className="w-5 h-5" />
              <span className="mx-4 font-medium">ホーム</span>
            </a>
            
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                href={`/users/${prof?.login_user?.id}`}
              >
                <MdPerson className="w-5 h-5" />
                <span className="mx-4 font-medium">プロフィール</span>
              </a>
            )}
            {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                href='#'
              >
                <MdPerson className="w-5 h-5" />
                <span className="mx-4 font-medium">プロフィール</span>
              </a>
            )}
            
            <a 
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
              href={`/search`}
            >
              <MdSearch className="w-5 h-5" />
              <span className="mx-4 font-medium">ユーザー検索</span>
            </a>
            
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                href={`/rooms`}
              >
                <MdOutlineChat className="w-5 h-5" />
                <span className="mx-4 font-medium">DM</span>
              </a>
            )}
            {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
              <a 
                className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" 
                href='#'
              >
                <MdOutlineChat className="w-5 h-5" />
                <span className="mx-4 font-medium">DM</span>
              </a>
            )}
            
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
                <span className="mx-4 font-medium">ログイン / 新規登録</span>
              </a> 
            )}
          </nav>
        </div>
      </div>    
    </div>  
    </>
  )
}

export default SideBar
