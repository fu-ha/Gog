import { useState, useEffect, useMemo } from "react"
import useSWR from "swr"
//import { useLikesCountSWR } from "hooks/useLikesSWR"
import axios from "axios"
import Cookies from "js-cookie"
//import { MdFavorite } from "react-icons/md"
import { MdKeyboardArrowDown } from "react-icons/md"

type PostData = {
  id: number,
}

const sample = () => {
  
  const url = process.env.NEXT_PUBLIC_BASE_URL + "posts"
  const [post, setPost] = useState()
  
  useEffect(() => {
    axios(url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setPost(res.data)
      })
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setPost(e.target.value)
  }
  
  const handleClick = () => {
    console.log(post)
  }
  
  return(
    <div className="flex">
     sample
      {post && post.map((data: any) => (
        <>
          <button 
            className="flex justify-center space-x-5 bg-white dark:bg-gray-500 border border-garay-200"
            //value={data} 
            key={data}
            onChange={(e: React.ChangeEvent<HTMLButtonElement>) => handleChange(e)}
            onClick={() => handleClick}
          >
            {data.id}
          </button>
        </>
      ))}
    </div>
  )
}

export default sample
