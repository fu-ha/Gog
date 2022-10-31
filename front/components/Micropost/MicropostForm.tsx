import { useState, useMemo, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useFlashMessage } from "hooks/useFlashMessage"
import { MicropostFormValue } from "types/MicropostType"
import { useRecoilState} from "recoil"
import { FeedTagAtom } from "atom/FeedTagAtom"
import { MdKeyboardArrowDown } from "react-icons/md"

type TagData = {
  id: number,
  name: string,
}

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

  /*const handleClickInputFile = () => {
    const target = document.getElementById("image")
    if (!target) {
      return
    }
    target.click()
  }*/
  
  const tag_url = process.env.NEXT_PUBLIC_BASE_URL + 'tags'
  //const ButtonRef = useRef<HTMLButtonElement>(null)
  const [micropostTag, setMicropostTag] = useState<TagData>()
  //const [micropostTag, setMicropostTag] = useState()
  //const [FeedTag, setFeedTag] = useRecoilState(FeedTagAtom)
  const [selectTag, setSelectTag] = useState()
  //const [openTag, setOpenTag] = useState(false)
  
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
  
  const handleClickTag = () => {
    //const Value = e.target.value
    //console.log(e.target.value) 
    //setMicropostTag(micropostTag)
    //console.log(setMicropostTag(micropostTag))
    //console.log(setMicropostTag)
    //console.log(selectTag)
    //console.log(ButtonRef.current?.value)
  }
  
  /*useEffect(() => {
    axios(tag_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        //setFeedTag(res.data)
        setMicropostTag(res.data)
        //console.log(res.data[1])
      })
  }, [])*/

  const { register, handleSubmit, formState: { errors } } = useForm<MicropostFormValue>()
  const { FlashMessage } = useFlashMessage()
  const router = useRouter()
    
  const onSubmit = (value: MicropostFormValue) => {
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
      .then((response) => {
        console.log(response)
        //router.reload()
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
      className="flex flex-col bg-white dark:bg-gray-900 rounded shadow px-5 pt-7"
    >
      <div className="w-full bg-white dark:bg-gray-900">
        <div className="pb-2 overflow-y-auto">
          <textarea 
            id="content"
            className="w-full px-2 pt-2 rounded-lg resize-none duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800"
            placeholder="投稿内容を書く"
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
        <div className="flex justify-center bg-white dark:bg-gray-900 rounded-b">
          <div className="flex space-x-1">
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
                className="relative inline-block ml-5"
                value={selectTag}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeTag(e)}
              >
                <option value="" selected>ゲームを選択</option>
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
            <div className="pr-1 md:pr-3">
              <label 
                //onClick={handleClickInputFile}
                className="w-full py-2 px-4 text-sm shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-700"
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
            <div className="pl-1 md:pl-3">
              <button 
                type="submit" 
                className="w-full py-2 px-12 text-sm shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 hover:bg-green-600 hover:dark:bg-green-900"
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