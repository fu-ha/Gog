import { useState, useEffect, useMemo } from "react"
import useSWR from "swr"
//import { useLikesCountSWR } from "hooks/useLikesSWR"
import axios from "axios"
import Cookies from "js-cookie"
//import { MdFavorite } from "react-icons/md"
import { MdKeyboardArrowDown } from "react-icons/md"

type TagData = {
  id: number,
  name: string
}

const sample = () => {
  
  const [micropostImage, setMicropostImage] = useState<File>()
  
  const MicropostImage = useMemo(() => {
    if (!micropostImage) {
      return
    }
    const MicropostImageUrl = URL.createObjectURL(micropostImage)
    return <img src={MicropostImageUrl} className="md:mb-2" />
  }, [micropostImage])

  
  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //target => currentTarget
    if (!e.currentTarget.files) return
    const imageFile: File = e.currentTarget.files[0]
    setMicropostImage(imageFile)
  }

  const handleClickInputFile = () => {
    const target = document.getElementById("image")
    if (!target) {
      return
    }
    target.click()
  }

  const items = [
    { id: 1, name: "hoge", address: "tokyo", age: 11 },
    { id: 2, name: "foo", address: "osaka", age: 22 },
    { id: 3, name: "boo", address: "fukuoka", age: 33 },
  ]
  
  const url = process.env.NEXT_PUBLIC_BASE_URL + "tags"
  const [tags, setTags] = useState<TagData>()
  const [openTag, setOpenTag] = useState(false)
  useEffect(() => {
    axios(url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setTags(res.data)
      })
  }, [])
  
  return(
    <>
    <label className="flex justify-center pt-10 mt-10">
      <select
        name="username"
        onChange={(e) => console.log(e.currentTarget.value)}
      >
        {
          items.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))
        }
      </select>
    </label>
    <label className="flex justify-center pt-10">
      <div className="relative inline-block ml-5">
      <button onClick={() => setOpenTag(!openTag)} className="relative flex z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
        <span>ゲームを選択する</span>
        <MdKeyboardArrowDown className="mt-1 items-center" />
      </button>
      {openTag && 
        <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
          {//tags && tags.map(tag => (
            //<button><option value={tag.id} key={tag.id}>{tag.name}</option></button>
          //))
          }
        </div>
      }
      </div>
    </label>
      <label 
        onClick={handleClickInputFile}
        className="flex w-30 py-2 px-4 text-sm shadow-sm rounded-md flex-shrink-0 inline-flex items-center justify-center duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-700"
      >
        <input 
          type="file" 
          accept="image/*"
          className="hidden" 
          //value=""
        　onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
        />
          ファイルを選択
      </label>
    </>
  )
}

export default sample
