import { useState, useMemo, useEffect, useRef } from "react"
// import { useRouter } from "next/router"
// import useSWR from "swr"
// import { useSWRConfig } from "swr"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "../../hooks/useFlashMessage"
import { MicropostFormValue } from "types/MicropostType"
// import { useRecoilState, useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil"
// import { FeedContentAtom } from "../../atom/FeedContentAtom"
// import { PostReloadSelector, RefreshSelector } from "../../atom/FeedContentAtom"
// import useFetch from "../../hooks/useFetch"
import { useReloadPost } from "../../hooks/useReloadPost"
// import { MicropostType } from "types/MicropostType"
// import { MdKeyboardArrowDown } from "react-icons/md"

// type PostType = {
//   id: number
// }
// type PostData = {
//   id: number,
//   user_id: number,
//   content: string,
//   created_at: string,
//   post_liked: boolean,
//   post_liked_count: number,
// }
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
  
  const [selectTag, setSelectTag] = useState()
  
  //const handleChangeTag = (e: React.ChangeEvent<HTMLButtonElement>) => {
  const handleChangeTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value
    //setFeedTag(selectValue)
    //setMicropostTag(selectValue)
    setSelectTag(selectValue)
    console.log(selectValue)
    //console.log(e.target.value[0])
    //setMicropostTag(e.target.value)
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm<MicropostFormValue>()
  // const url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  // const { fetchContent } = useFetch()
 // const { Fetch } = useRecoilValue(FetchSelector)
  const { FlashMessage } = useFlashMessage()
  // const router = useRouter()
  const { reloadFetching } = useReloadPost()
  // const refresh = useRecoilRefresher_UNSTABLE(RefreshSelector)
  
  const onSubmit = (value: MicropostFormValue): void => {
    //const formData = { content: value.content, /*tag_id: value.tag_id,*/ image: value.image?.url }
    
    const formData = new FormData()
    formData.append("content", value.content)
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
        FlashMessage({ type: "SUCCESS", message: "投稿に成功しました" })
      })
      .then((data) => {
        console.log(data)
        // 投稿ボタン押して同時に投稿内容の反映！！
        reloadFetching()
      })
      .catch((error) => {
        console.log('Error:', error)
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
            className="w-full px-2 pt-2 rounded-lg resize-none duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-800"
            placeholder="投稿内容を書く"
            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e)}
            {...register("content", { required: true })}
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
        <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-b">
          <div className="md:flex">
            {/*タグ選択*/}
            {/*<div className="relative inline-block ml-5">
              <button onClick={() => setOpenTag(!openTag)} className="relative flex z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
                <span>ゲームを選択</span>
                <MdKeyboardArrowDown className="mt-1 items-center" />
              </button>
              {openTag &&
                <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                  {micropostTag && micropostTag.map((data: any) => (
                    <li 
                      className="list-none" 
                      key={data.id}
                      id={`tag-${data.id}`}
                    >
                      <button
                        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        //ref={ButtonRef}
                        //value={micropostTag[0]} 
                        value={data}
                        //onChange={(e: React.ChangeEvent<HTMLButtonElement>) => handleChangeTag(e)} 
                        onChange={(e: React.ChangeEvent<HTMLButtonElement>) => console.log(e)}
                        //onClick={() => handleClickTag()} 
                      >
                        {data.name}
                      </button>
                    </li>
                  ))}
                </div>
              }
            </div>*/}
            <div className="mb-2 md:mr-6">
              <label>
              {/*<select 
                className="relative inline-block ml-5"
                value={selectTag}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeTag(e)}
              >
                <option selected>ゲームを選択</option>
                {micropostTag && micropostTag.map((data: any) => (
                  <option
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    value={data.name}
                    //onChange={(e: React.ChangeEvent<HTMLOptionElement>) => handleChangeTag(e)} 
                    onClick={() => handleClickTag()} 
                  >
                    {data.name}
                　</option>
                ))}
              </select>*/}
                <select
                  className="relative py-2 rounded-md inline-block dark:bg-gray-700"
                  value={selectTag}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeTag(e)}
                >
                  <option className="flex items-center" value="" selected>ゲームを選択する</option>
                  <option value="Apex Legends">Apex Legends</option>
                  <option value="スプラトゥーン３">スプラトゥーン３</option>
                  <option value="スマブラSP">スマブラSP</option>
                  <option value="フォートナイト">フォートナイト</option>
                  <option value="COD">COD</option>
                  <option value="CoD:Mobile">CoD:Mobile</option>
                  <option value="荒野行動">荒野行動</option>
                  <option value="PUBG">PUBG</option>
                  <option value="PUBG:Mobile">PUBG:Mobile</option>
                  <option value="原神">原神</option>
                </select>
              </label>
            </div>
            <div className="mb-2 md:pr-3">
              <label 
                //onClick={handleClickInputFile}
                className="w-full py-2 px-4 text-sm shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-700"
              >
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
              　 />
                  ファイルを選択
              </label>
            </div>
            <div className="md:pl-3">
              <button 
                type="submit" 
                //onClick={onClick}
                // onClick={() => setCount(count + 1)}
                className="w-full py-2 px-12 text-sm shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 hover:bg-green-600 hover:dark:bg-green-900"
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
