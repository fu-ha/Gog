import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { MicropostType } from "types/MicropostType"

const Sample = () => {
  
  const [post, setPost] = useState<MicropostType[]>()
  const post_url = process.env.NEXT_PUBLIC_BASE_URL + "posts"
  
  useEffect(() => {
    axios(post_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setPost(res.data)
      })
  }, [])
  
  return (
    <>
      {post && post.map((data) => (
        <p>{data.content}</p>  
      ))}
    </>
  )
}

export default Sample