import { useRouter } from 'next/router';
import { Auth } from "modules/Auth"
import axios from "axios"
import LoginForm from "components/LoginForm"
import SignupModal from "components/Modal/SignupModal"
import { UserLoginType } from "types/UserType"

const url = process.env.NEXT_PUBLIC_BASE_URL + 'auth/guest_sign_in'

const Login = () => {
  const router = useRouter()
  
  const guest_login = () => {
    axios.post(url)
      .then((res) => res.data)
      .then((data): UserLoginType | undefined => {
        if (data.error) {
          console.log(data.error)
          return
        }
        console.log('guest_login is succssfully')
        Auth.login(data.accessToken, data.client, data.uid)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  return(
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:border-gray-600">
      <div className="flex flex-col bg-bgPrimary dark:bg-dark-900 relative items-center grow">
        <header className="bg-white shadow sm:sticky sm:top-0 z-30 overscroll-none w-full flex-shrink-0 dark:bg-gray-800 dark:border-gray-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-800 dark:border-gray-600">
            <div className="flex justify-between h-16">
              <div className="flex">
                <a className="pt-3 text-3xl text-gray-600 dark:text-gray-400" href="/">Gog</a>
              </div>
            </div>
          </div>
          
        </header>
        <div className="grow relative flex max-w-screen-lg w-full dark:bg-gray-900 dark:border-gray-600">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 flex flex-col items-center justify-center lg:flex-none my-12 sm:my-12 mx-6 w-full">
              <div className="bg-white dark:bg-gray-800 px-10 pt-10 pb-10 rounded-xl shadow-lg md:w-1/2">
                <div>
                  <div>
                    <h1 className="inline-flex justify-center font-bold text-xl text-center text-gray-600 dark:text-gray-400 w-full">
                      Gogをはじめる
                    </h1>
                  </div>
                </div>
                <div className="mt-6">
                  <div>
                    <LoginForm />
                  </div>
                  <div className="mt-6 w-full border-t border-gray-300 dark:border-dark-700 "></div>
                  <div className="mt-6">
                    <SignupModal />
                  </div>
                  <div className="mt-6 w-full border-t border-gray-300 dark:border-dark-700 "></div>
                  <div className="mt-6">
                    <button 
                      type="submit" 
                      className=" w-full p-2 text-base border-transparent text-white bg-blue-600 hover:bg-blue-700  inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default Login