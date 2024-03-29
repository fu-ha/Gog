import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from "axios"
import Cookies from "js-cookie"
import { useFlashMessage } from "../../hooks/useFlashMessage"
import { LoginValueType } from "../../types/UserType"

const sign_in_url = process.env.NEXT_PUBLIC_BASE_URL + 'auth/' + 'sign_in'

const LoginForm = () => {
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginValueType>()
  
  const onSubmit = (value: LoginValueType) => {
    axios.post(sign_in_url, {
      email: value.email,
      password: value.password
    })
      .then((res) => {
        Cookies.set("access-token", res.headers["access-token"])
        Cookies.set("client", res.headers["client"])
        Cookies.set("uid", res.headers["uid"]) 
        reset()
        router.push('/')
        FlashMessage({ type: "SUCCESS", message: "ログインに成功" })
      })
      .catch((err) => {
        console.error('Error:', err)
        Cookies.remove("access-token")
        Cookies.remove("client")
        Cookies.remove("uid")
        FlashMessage({ type: "DANGER", message: "ログインに失敗" })
      })
  }
  
  return(
    <form className="md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex md:space-y-1.5 items-center">
          <div className="flex">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">メールアドレス</label>
          </div>
        </div>
        <div className="mt-1">
          <input 
            type="email" 
            placeholder="email@example.com"
            className="mt-1 block w-full border border-gray-800 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm" 
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span role="alert" className="text-xs text-red-500">
              ※この項目は必須です
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1.5 items-center">
            <div className="flex">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">パスワード</label>
            </div>
          </div>
          {/*
            <div className="text-sm">
              <p className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer" aria-hidden="true">パスワードを忘れた方</p>
            </div>
          */}
        </div>
        <div className="mt-1">
          <input 
            type="password" 
            placeholder="password"
            className="mt-1 block w-full border border-gray-800 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm placeholder-gray-500 placeholder-opacity-0" 
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.email && (
            <span role="alert" className="text-xs text-red-500">
              ※この項目は必須です
            </span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <button 
          type="submit" 
          className="w-full p-2 text-base text-green-500 dark:text-green-400 inline-flex items-center justify-center rounded-md shadow-sm font-medium duration-200 border-solid border border-green-500 bg-white dark:bg-gray-800 hover:text-white hover:dark:text-white hover:bg-green-500 dark:hover:bg-green-600"
        >
          ログイン
        </button>
      </div>  
    </form>
  )
}

export default LoginForm