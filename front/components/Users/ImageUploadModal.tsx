import { useState, useMemo } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { MdClear } from "react-icons/md" 

type ImageUploadProps = {
  id?: number
}

export const ImageUploadModal = ({ id }: ImageUploadProps) => {
  const update_url = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}`
  const [image, setImage] = useState<File>()
  
  const Select_Image = useMemo(() => {
    if (!image) {
      return
    }
    const Image_Url = URL.createObjectURL(image)
    return <img src={Image_Url} className="rounded-full object-cover md:h-72 md:w-72" />
  }, [image])
  
  const Upload_Image = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const imageFile: File = e.target.files[0]
    setImage(imageFile)
  }
  
  const Clear_Image = () => {
    setImage(undefined)
  }
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
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
        console.log(res.data)
      })
  }
  
  return(
    <div className="fixed top-0 left-0 right-0 z-50    w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full ">
    <div className="flex justify-center items-center h-full">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <form
          onSubmit={handleSubmit(onSubmit)} 
          className="relative rounded-lg shadow bg-white dark:bg-gray-700"
        >
          <div className="flex justify-center">
            <div className="relative flex my-16 h-20 w-20 md:h-64 md:w-64">
              <span className="object-cover rounded-full inline-block flex-shrink-0 overflow-hidden rounded-full h-full w-full ring-2 sm:ring-4 md:ring-2 lg:ring-4 ring-green-600 dark:ring-green-400">
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
              <div className="absolute md:mr-5 md:mt-52 right-0">
                <button
                  className="p-3 text-2xl text-gray-600 dark:text-gray-400 rounded-full bg-gray-200 dark:bg-gray-600"
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
              className="block text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600"
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
