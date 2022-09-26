import { useState, useMemo } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "hooks/useFlashMessage"
import { MicropostFormValue } from "types/MicropostType"

const post_url = process.env.NEXT_PUBLIC_BASE_URL + "posts"

const MicropostForm = () => {
  const [micropostImage, setMicropostImage] = useState<File>()
  
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

  const { register, handleSubmit, formState: { errors } } = useForm<MicropostFormValue>()
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
    
  const onSubmit = (value: MicropostFormValue) => {
    const formData = { content: value.content }
    
    axios.post(post_url, formData, { 
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((response) => {
        console.log(response)
        router.reload()
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .catch((error) => {
        console.log('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
  }
  
  return(
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col bg-white dark:bg-gray-800 rounded shadow p-5"
    >
      <div className="w-full bg-white dark:bg-gray-800">
        <div className="pb-2 overflow-y-auto">
          <textarea 
            id="content"
            className="w-full px-2 pt-2 rounded-lg resize-none bg-gray-100 dark:bg-gray-700"
            placeholder="投稿内容を書く"
            {...register("content", { required: true })}
          />
          {/*errors.content && (
            <span role="alert" className="pt-2 text-xs text-red-500">
              content必須
            </span>
          )*/}
          <div className="pt-2">{MicropostImage}</div>
        </div>
        <div className="flex justify-center bg-white dark:bg-gray-800 rounded-b">
          <div className="flex space-x-1">
            <div className="pr-1 md:pr-3">
              <label 
                onClick={handleClickInputFile}
                className="w-full py-2 px-4 text-sm border border-transparent  text-gray-600 bg-gray-300 dark:text-gray-300 dark:bg-gray-600  shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center font-medium focus:outline-none disabled:opacity-50"
              >
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
              　   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
                />
                ファイルを選択
              </label>
              {/*<button 
                className="w-full py-2 px-4 text-sm border border-transparent  text-gray-600 bg-gray-300 dark:text-gray-300 dark:bg-gray-600  shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center font-medium focus:outline-none disabled:opacity-50"
                onClick={handleClickInputFile}
              >
                <label className="">
                  ファイル選択
                </label> 
                <input 
                  type="file" 
                  className="hidden" 
                　onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
                />
              </button>*/}
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
