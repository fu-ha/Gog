import { useState, useMemo } from "react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { MdClear } from "react-icons/md" 
import { OpenModalAtom } from "atom/OpenModalAtom"

type ImageUploadProps = {
  id?: number
}

export const ImageUploadModal = ({ id }: ImageUploadProps) => {
  const update_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}`
  const [image, setImage] = useState<File>()
  const [OpenModal, setOpenModal] = useRecoilState(OpenModalAtom)
  
  const Select_Image = useMemo(() => {
    if (!image) {
      return
    }
    const Image_Url = URL.createObjectURL(image)
    return <img src={Image_Url} className="rounded-full object-cover md:h-72 md:w-72" />
  }, [image])
  
  const Upload_Image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImage(e.target.files[0])
  }
  
  const Clear_Image = () => {
    setImage(undefined)
  }
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { router } = useRouter()
  
  const onSubmit = () => {
    const formData = new FormData()
		if (image) formData.append("image", image)
		
    axios.patch(update_url, formData, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setImage(undefined)
        // router.reload()
        console.log(res.data)
      })
      .then((err) => {
        console.error(err)
      })
  }
  
  return(
    <div className="fixed inset-0 absolute">
    <div className="absolute inset-0  opacity-75 dark:opacity-90 bg-gray-500 dark:bg-gray-700"></div>
    <div className="flex justify-center items-center h-full">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <form
          onSubmit={handleSubmit(onSubmit)} 
          className="relative rounded-lg shadow bg-gray-100 opacity-100 dark:bg-gray-900"
        >
          <div className="flex float-right mt-3 mr-3">
            <button 
              type="button"
              className="p-2 text-2xl text-gray-600 dark:text-gray-400 rounded-full bg-gray-200 dark:bg-gray-600"
              onClick={() => setOpenModal(!OpenModal)}
            >
              <MdClear />
            </button>
          </div>
          <div className="flex justify-center ml-12">
            <div className="relative flex my-16 h-20 w-20 md:h-64 md:w-64">
              <span className="object-cover rounded-full inline-block flex-shrink-0 overflow-hidden rounded-full h-full w-full ring-2 sm:ring-4 md:ring-2 lg:ring-4 ring-gray-600 dark:ring-gray-400">
                <div className="flex justify-center">{Select_Image}</div>
                <label className="md:pb-72">
                  <input
                    type="file"
                    accept="image/*"
                    className="invisible"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => Upload_Image(e)}
                  />
                </label>
              </span>
              <div className="absolute md:mr-10 md:mt-56 right-0">
                <button
                  type="button"
                  className="text-xl text-gray-400 dark:text-gray-500 rounded-full bg-gray-200 dark:bg-gray-600"
                  onClick={() => Clear_Image()}
                >
                  <MdClear />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-6">
            <button
              type="submit" 
              className="block text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
