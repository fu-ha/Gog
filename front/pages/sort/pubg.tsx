import { useState, useEffect, useMemo } from "react"
import { useRecoilState } from "recoil"
import { FeedContentAtom } from "atom/FeedContentAtom"
import axios from "axios"
import Cookies from "js-cookie"
import Layout from "components/Layout"
import { MicropostForm } from "components/Micropost/MicropostForm"
import MicropostCard from "components/Micropost/MicropostCard"
import SelectMicropostTag from "components/Micropost/SelectMicropostTag"

const PUBG = () => {
  const post_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  const [isClient, setIsClient] = useState(false)
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
  useEffect(() => {
    const handleFetch = async () => {
    　await axios.get(post_url, {
      　headers: {
        　"access-token": Cookies.get("access-token") || "",
      　　  "client": Cookies.get("client") || "",
        　"uid": Cookies.get("uid") || ""
      　}
    　})　
        .then((res) => {
          setFeedContent(res.data)
          console.log("FeedContent", res.data)
        })
        .catch((err) => {
          console.error(err)
        })
  　}
    handleFetch()
    ///第二引数に「FeedContent」設置で投稿時リロードなしで新規投稿が画面に投稿される！！///
  }, [])
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && FeedContent.map((data) => (
          <>
            {data.tag == "PUBG" && (
              <li 
                className="list-none mb-3 md:mb-5"
                key={data.id} 
                id={`post-${data.id}`}
              >
                <MicropostCard id={data.user_id} post={data} />
              </li> 
            )}
          </>
        ))}
      </>
    )
  }, [FeedContent])
  
  return(
    <Layout>
      <div className="inset-0 py-3 md:py-8 sm:px-6 lg:px-10">
          <div className="z-0 md:rounded-b-lg ">
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <MicropostForm />
            )}
            <SelectMicropostTag />
            {Post_List}
          </div>            
        </div>
    </Layout>
  )
}

export default PUBG
