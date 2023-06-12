import { useRouter } from 'next/router'
import { useTheme } from "next-themes"
import axios from "axios"
import Cookies from "js-cookie"
import LoginForm from "../components/Auth/LoginForm"
import SignupModal from "../components/Auth/SignupModal"
import { useFlashMessage } from "../hooks/useFlashMessage"
import { MdLightMode } from "react-icons/md"
import { MdModeNight } from "react-icons/md"

const guest_url = process.env.NEXT_PUBLIC_BASE_URL + 'auth/guest_sign_in'

const Auth = () => {
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  const guest_login = () => {
    axios.post(guest_url)
      .then(function (res) {
        Cookies.set("uid", res.headers["uid"])
        Cookies.set("client", res.headers["client"])
        Cookies.set("access-token", res.headers["access-token"])
        FlashMessage({ type: "SUCCESS", message: "ゲストログインに成功" })
        router.push("/")
      })
      .catch((err) => {
        console.error(err)
        Cookies.remove("access-token")
        Cookies.remove("client")
        Cookies.remove("uid")
        FlashMessage({ type: "DANGER", message: "ゲストログインに失敗" })
      })
  }
  
  return(
    <div className="h-screen flex flex-col overflow-hidden md:overflow-hidden dark:bg-gray-900 dark:border-gray-600">
      <div className="flex flex-col bg-bgPrimary dark:bg-dark-900 relative items-center md:grow">
        <header className="bg-white shadow sm:sticky sm:top-0 z-10 overscroll-none w-full flex-shrink-0 dark:bg-gray-900 border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex justify-between h-16">
              <div className="flex">
                <a className="pt-3 text-3xl duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="/">Gog</a>
              </div>
            </div>
          </div>
        </header>
        
        <div className="md:grow relative flex max-w-screen-lg w-full dark:bg-gray-900 dark:border-gray-600">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 flex flex-col items-center justify-center lg:flex-none my-12 sm:my-12 mx-6 w-full">
              <div className="bg-white dark:bg-gray-800 px-12 py-10 rounded-xl shadow-lg w-full md:w-1/2">
                <div className="flex">
                  <h1 className="flex-col w-full inline-flex justify-center font-bold text-xl text-center duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    Gogをはじめる
                  </h1>
                  <button 
                    className="flex-col block p-1 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-green-500" 
                    onClick={handleSetTheme}
                  >
                    {theme === 'light' ? <MdLightMode className="w-5 h-5 text-gray-600 hover:text-gray-500" /> : <MdModeNight className="w-5 h-5 text-gray-400 hover:text-gray-300" />}
                  </button>
                </div>
                <div className="mt-3 md:mt-6">
                  <div>
                    <LoginForm />
                  </div>
                  <div className="mt-3 md:mt-6 w-full border-t border-gray-800 dark:border-gray-500"></div>
                  <div className="mt-3 md:mt-6">
                    <SignupModal />
                  </div>
                  <div className="mt-3 md:mt-6 w-full border-t border-gray-800 dark:border-gray-500"></div>
                  <div className="mt-3 md:mt-6">
                    <button 
                      type="submit" 
                      className="w-full p-2 text-base text-blue-500 dark:text-blue-400 inline-flex items-center justify-center rounded-md shadow-sm font-medium border-solid border border-blue-500 bg-white dark:bg-gray-800 hover:text-white hover:dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                      onClick={guest_login}
                    >
                      ゲストログイン
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth