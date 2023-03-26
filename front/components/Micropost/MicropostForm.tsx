import { useState, useMemo } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "../../hooks/useFlashMessage"
import { MicropostFormValue } from "types/MicropostType"
import { useReloadPost } from "../../hooks/useReloadPost"
// import { MdKeyboardArrowDown } from "react-icons/md"

const post_url = process.env.NEXT_PUBLIC_BASE_URL + "posts" 

export const MicropostForm = () => {
  const [micropostImage, setMicropostImage] = useState<File>()
  
  const MicropostImage = useMemo(() => {
    if (!micropostImage) {
      return
    }
    const MicropostImageUrl = URL.createObjectURL(micropostImage)
    return <img src={MicropostImageUrl} className="mb-2 md:mb-2" />
  }, [micropostImage])

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const imageFile: File = e.target.files[0]
    setMicropostImage(imageFile)
  }

  /*const handleClickInputFile = () => {
    const target = document.getElementById("image")
    if (!target) {
      return
    }
    target.click()
  }*/
  
  // const [openTag, setOpenTag] = useState(false)
  const [selectTag, setSelectTag] = useState<string>()
  
  // const handleChangeTag = (e: React.ChangeEvent<HTMLButtonElement>) => {
  const handleChangeTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTag(e.target.value)
  }
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MicropostFormValue>()
  const { FlashMessage } = useFlashMessage()
  const { reloadPostFetching } = useReloadPost()
  
  const onSubmit = (value: MicropostFormValue): void => {
    //const formData = { content: value.content, /*tag_id: value.tag_id,*/ image: value.image?.url }
    
    const formData = new FormData()
    if (value.content) {
      formData.append("content", value.content)
    }
    if (micropostImage) {
      formData.append("image", micropostImage)
    }
    if (selectTag) {
      formData.append("tag", selectTag)
    }
    
    axios.post(post_url, formData, { 
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log("MicropostForm", res.data)
        reset({ content: ''})
        setSelectTag(undefined)
        setMicropostImage(undefined)
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .then((data) => {
        console.log(data)
        reloadPostFetching()
      })
      .catch((error) => {
        console.error('Error:', error)
        FlashMessage({ type: "DANGER", message: "投稿に失敗しました" })
      })
  }
  
  return(
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col bg-gray-100 dark:bg-gray-800 md:rounded-lg shadow px-5 md:px-5 pt-5 md:pt-7 pb-3 md:pb-3"
    >
      <div className="w-full bg-gray-100 dark:bg-gray-800">
        <div className="md:pb-2 overflow-y-auto">
          <textarea 
            id="content"
            className="w-full px-2 pt-2 rounded-lg resize-none duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700"
            placeholder="投稿内容を書く"
            // {...register("content", { required: true })}
          />
          {/*errors.content && (
            <span role="alert" className="pt-2 text-xs text-red-500">
              content必須
            </span>
          )*/}
          {/*
          */}
          <div className="pt-2">{MicropostImage}</div>
        </div>
        <div className="flex md:justify-center bg-gray-100 dark:bg-gray-800 rounded-b">
          <div className="flex flex-1 md:flex-none">
            <div className="mb-2 md:mr-6 flex-1">
              <div className="text-xs md:text-base">
              {/* 
                <button
                  className="w-24 md:w-32 py-2 md:py-2 mr-1.5 md:mr-1 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 hover:bg-blue-300 hover:dark:bg-blue-900"
                  type="button"
                  value={selectTag}
                  onClick={() => setOpenTag(!openTag)}
                  // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeTag(e)}
                  onChange={(e: React.ChangeEvent<HTMLButtonElement>) => handleChangeTag(e)}
                >
                  <div className="flex px-1">
                  <button className="flex flex-col items-center ml-1 md:ml-2" value="">ゲーム選択</button>
                  <MdKeyboardArrowDown className="flex mt-1 ml-1 md:ml-2 items-center" />
                  </div>
                  {openTag && (
                    <div className="absolute left-13 z-20 w-48 mt-5 bg-white rounded-md shadow-xl bg-gray-100 dark:bg-gray-800">
                      <button value="Apex Legends" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">Apex Legends</button>
                      <button value="スプラトゥーン３" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">スプラトゥーン３</button>
                      <button value="スマブラSP" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">スマブラSP</button>
                      <button value="フォートナイト" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">フォートナイト</button>
                      <button value="COD" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">COD</button>
                      <button value="CoD:Mobile" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">CoD:Mobile</button>
                      <button value="荒野行動" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">荒野行動</button>
                      <button value="PUBG" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">PUBG</button>
                      <button value="PUBG:Mobile" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">PUBG:Mobile</button>
                      <button value="原神" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">原神</button>
                    </div>
                  )}
                </button>
              */}
                <select
                  className="w-24 md:w-32 h-9 md:h-11 mr-1.5 md:mr-1 shadow-sm rounded-md text-center md:text-center border border-gray-200 dark:border-gray-700 dark:bg-gray-700  hover:bg-blue-300 hover:dark:bg-blue-900"
                  value={selectTag}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeTag(e)}
                >
                  <option value="" selected>タグ選択</option>
                  <option value="Apex Legends">Apex Legends</option>
                  <option value="スプラトゥーン３">スプラトゥーン３</option>
                  <option value="スマブラSP">スマブラSP</option>
                  <option value="フォートナイト">フォートナイト</option>
                  <option value="COD">COD</option>
                  <option value="CoD:Mobile">CoD:Mobile</option>
                  <option value="荒野行動">荒野行動</option>
                  <option value="PUBG">PUBG</option>
                  <option value="PUBG:Mobile">PUBG:Mobile</option>
                  <option className="pl-5" value="原神">原神</option>
                </select>
              </div>
            </div>
            <div className="mb-2 md:pr-3 flex-1">
              <label 
                //onClick={handleClickInputFile}
                className="py-2 w-24 md:w-32 text-sm shadow-sm rounded-md inline-block items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-600"
              >
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
              　 />
                  <p className="text-center text-xs md:text-base text-gray-700 dark:text-gray-200">ファイル選択</p>
              </label>
            </div>
            <div className="md:pl-3">
              <button 
                type="submit" 
                className="py-2 w-24 md:w-32 text-sm shadow-sm rounded-md flex-shrink-0 inline-block items-center justify-center duration-200 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-700 hover:bg-green-400 hover:dark:bg-green-900"
              >
                <span className="text-center block text-xs md:text-base text-gray-700 dark:text-gray-200">投稿</span> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}