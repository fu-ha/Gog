import { useState, useMemo } from "react"
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useFlashMessage } from "hooks/useFlashMessage"
import { MicropostFormValue } from "types/MicropostType"
//import { MicropostFormValue } from "types/MicropostType"
//import { Auth } from "modules/Auth"
import Cookies from "js-cookie"

const post_url = process.env.NEXT_PUBLIC_BASE_URL + "posts"

const MicropostForm = () => {
  const [micropostImage, setMicropostImage] = useState<File>()
  const { register, handleSubmit } = useForm<MicropostFormValue>()
  const { FlashMessage } = useFlashMessage()
  
  const MicropostImage = useMemo(() => {
    if (!micropostImage) {
      return
    }
    const MicropostImageUrl = URL.createObjectURL(micropostImage)
    return <img src={MicropostImageUrl} className="md:mb-2" />
  }, [micropostImage])

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const imageFile: File = e.target.files[0]
    setMicropostImage(imageFile)
  }

  const handleClickInputFile = () => {
    const target = document.getElementById("image")
    if (!target) {
      return
    }
    target.click()
  }
  
  /*const axiosInst = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
  })*/

  const onSubmit = (value: MicropostFormValue) => {
    const params = {
       "access-token": Cookies.get("access-token"),
        "client": Cookies.get("client"),
        "uid": Cookies.get("uid")
    }
    axios.post(post_url, {
      data: params,
      post: {
        content: value.content
      }
    })
      .then((res) => res.data)
      .then((data) => {
        if (data == undefined) {
          return
        }
        setMicropostImage(undefined)
        console.log(data)
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .catch((error) => {
        console.error('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="w-full bg-white dark:bg-gray-800">
        <div className="pb-2 overflow-y-auto">
          <textarea 
            className="w-full md:mb-2 px-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            placeholder="投稿内容を書く"
            {...register("content", { required: true })}
          />
          {MicropostImage}
        </div>
        <div className="flex justify-center bg-white dark:bg-gray-800 rounded-b">
          <div className="flex space-x-1">
            <div className="pr-1 md:pr-3">
              <button 
                className="w-full py-2 px-4 text-sm border border-transparent  text-gray-600 bg-gray-300 dark:text-gray-300 dark:bg-gray-600  shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center font-medium focus:outline-none disabled:opacity-50"
                onClick={handleClickInputFile}
              >
                <label className="">
                  ファイル選択
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
                  />
                </label> 
              </button>
            </div>
            <div className="pl-1 md:pl-3">
              <button 
                type="submit" 
                className="w-full py-2 px-12 text-sm border border-transparent  text-white bg-green-600 dark:text-gray-300 dark:bg-green-900  shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center font-medium focus:outline-none disabled:opacity-50"
              >
                <span className="block">投稿</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default MicropostForm