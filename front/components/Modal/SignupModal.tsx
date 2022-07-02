import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useFlashMessage } from "hooks/useFlashMessage"
import { Auth } from 'modules/Auth'
import axios from "axios"

import { UserValueType, UserSignupType } from "types/UserType"

const endpoint = process.env.NEXT_PUBLIC_BASE_URL + 'auth'

const SignupModal = () =>{
  const [openModal, setOpenModal] = useState(false)
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<UserValueType>();

  const onSubmit = (value: UserValueType) => {
    axios.post(endpoint, {
        name: value.name,
        email: value.email,
        password: value.password,
        password_confirmation: value.password_confirmation
      })
      .then((res) => res.data)
      .then((data): UserSignupType | void => {
        if (data.errors) {
          FlashMessage({ type: "DANGER", message: "フォームの入力が間違っています" })
          return
        }
        console.log('response data', data)
        console.log('User is created successfully')
        Auth.login(data.aceesToken, data.client, data.uid)
        const user_data = data.user
        FlashMessage({type: "SUCCESS", message: `${user_data.name}が新規登録しました` })
        //router.push(`/users/${user_data.id}`)
        router.push("/")
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return(
    <>
      <button 
        type="submit" 
        className=" w-full p-2 text-base border-transparent text-white bg-violet-600 hover:bg-violet-700  inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        onClick={() => setOpenModal(true)}
      >
        新規登録
      </button>
      
      {openModal ? (
        <div className="fixed z-20 inset-0">
          <div className="flex items-center justify-center min-h-full max-h-full  text-center p-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div aria-hidden="true" className="absolute inset-0 bg-gray-700 dark:bg-dark-800 opacity-75">
              </div>
            </div>
            <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800 shadow-xl text-left transform transform-all">
              <h3 className="text-3xl font-semibold text-center text-gray-600 dark:text-gray-400">アカウント登録</h3>
              <div className="w-full border-t border-gray-300 dark:border-gray-700 mt-3"></div>
              <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6">
                  <label className="block text-sm text-gray-600 dark:text-gray-400">ニックネーム</label>
                  <input 
                    type="text"
                    className="mt-1 block w-full border border-gray-800 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm" 
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <span role="alert" className="text-xs text-red-500">
                      name
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <label className="mt-2 block text-sm text-gray-600 dark:text-gray-400">メールアドレス</label>
                  <input 
                    type="text"
                    className="mt-1 block w-full border border-gray-800 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm" 
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span role="alert" className="text-xs text-red-500">
                      email
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <label  className="mt-2 block text-sm text-gray-600 dark:text-gray-400">パスワード</label>
                  <input 
                    type="password"
                    className="mt-1 block w-full border border-gray-800 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm" 
                    {...register('password', { required: true, minLength: 8 })}
                  />
                  {errors.password && (
                    <span role="alert" className="text-xs text-red-500">
                      password
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <label  className="mt-2 block text-sm text-gray-600 dark:text-gray-400">確認用パスワード</label>
                  <input 
                    type="password"
                    className="mt-1 block w-full border border-gray-800 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-3 px-4 focus:outline-none sm:text-sm" 
                    {...register('password_confirmation', { required: true, minLength: 8 })}
                  />
                  {errors.password_confirmation && (
                    <span role="alert" className="text-xs text-red-500">
                      password_confirmation
                    </span>
                  )}
                </div>
                <div className="w-full border-t border-gray-300 dark:border-gray-700 mt-6"></div>
                <div className="mt-6">
                  <button 
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-violet-600 hover:bg-violet-700 focus:outline-none focus:bg-violet-500"
                  >
                    登録
                  </button>
                  <button 
                    className="mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={() => setOpenModal(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )  
}
export default SignupModal