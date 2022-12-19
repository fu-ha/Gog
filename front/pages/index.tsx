import { useState, useEffect, useMemo } from "react"
//import { MdClear } from "react-icons/md"
import useSWR from "swr"
import { useRecoilState } from "recoil"
import { FeedContentAtom } from "../atom/FeedContentAtom"
//import { FeedReloadUrlSelector } from "atom/FeedContentAtom"
//import useSWR from "swr"
import Cookies from "js-cookie"
import axios from "axios"
import Layout from "../components/Layout"
//import { MicropostType } from "types/MicropostType"
import { MicropostForm } from "../components/Micropost/MicropostForm"
import MicropostCard from "../components/Micropost/MicropostCard"
import SelectMicropostTag from "../components/Micropost/SelectMicropostTag"
//import InfiniteScroll from "react-infinite-scroller"
//import { useFeedFetch } from "hooks/useFeedFetch"
//import { MicropostType} from "types/MicropostType"

//const authentication_url = process.env.NEXT_PUBLIC_BASE_URL + "auth/sessions"
//const user_url = process.env.NEXT_PUBLIC_BASE_URL + "users"

/*type UserData = {
  login_user: {
    id: number
  }
}

type PostData = {
  id?: number
} */

// export const Index  = () => {
const Index = () => {
  const [isClient, setIsClient] = useState(false)
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
  const post_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  
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
          //setMicropost(res.data)
          console.log("FeedContent", res.data)
        })
        // .catch((error) => {
        //   console.log(error)
        // })
  　}
    handleFetch()
    ///第二引数に「FeedContent」設置で投稿時リロードなしで新規投稿が画面に投稿される！！///
  }, [])
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && FeedContent.map((data) => (
          <>
            <li 
              className="list-none mb-3 md:mb-5"
              key={data.id} 
              id={`post-${data.id}`}
            >
              <MicropostCard id={data.user_id} post={data} />
            </li> 
          </>
        ))}
      </>
    )
  }, [FeedContent])
  
  /*useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
    async function fetching() {
      const response = await axios.get(url, {
        headers: {
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || ""
        }
      })
      const json = await response.data
      return json
    }
    fetching()
  }, [Post_List])*/
  
  //const { ReloadFetching } = useRecoilValue(FeedReloadUrlSelector)  
  
  //useEffect(() => {
  //  ReloadFetching()
  //}, [FeedContent])
  
  
  return(
    <>
      <Layout>
        <div className="inset-0 py-3 md:py-8 sm:px-6 lg:px-10">
          <div className="z-0 md:rounded-b-lg ">
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <>
                <MicropostForm />
                <SelectMicropostTag />
                {Post_List}
              </>
            )}
            {isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
              <p>投稿するにはログイン・新規登録、またはゲストログインしてください。</p>
            )}
          </div>            
        </div>
      </Layout>
    </>  
  )
}

export default Index