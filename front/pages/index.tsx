import { useState, useEffect, useMemo } from "react"
//import { MdClear } from "react-icons/md"
import useSWR from "swr"
import { useRecoilValue, useRecoilState } from "recoil"
import { FeedContentAtom } from "atom/FeedContentAtom"
//import { FeedReloadUrlSelector } from "atom/FeedContentAtom"
//import useSWR from "swr"
import Cookies from "js-cookie"
import axios from "axios"
import Layout from "components/Layout"
//import { MicropostType } from "types/MicropostType"
import MicropostForm from "components/Micropost/MicropostForm"
import MicropostCard from "components/Micropost/MicropostCard"
import SelectMicropostTag from "components/Micropost/SelectMicropostTag"
//import InfiniteScroll from "react-infinite-scroller"
//import { useFeedFetch } from "hooks/useFeedFetch"
//import { MicropostType} from "types/MicropostType"

//const authentication_url = process.env.NEXT_PUBLIC_BASE_URL + "auth/sessions"
const user_url = process.env.NEXT_PUBLIC_BASE_URL + "users"
const post_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'

type UserData = {
  login_user: {
    id: number
  }
}

type PostData = {
  id?: number
}

const Index = () => {
  const [isClient, setIsClient] = useState(false)
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  //const [post, setPost] = useState<PostData>()
  //const { user_data } = useUserSWR()
  
  /*useEffect(() => {
    axios.get(authentication_url, {
       headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    }).then((res) => res.data)
  }, [])
  
  const [user, setUser] = useState<UserData>()
  useEffect(() => {
    axios.get(user_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setUser(res.data)
      })
  }, [])
  */
  
  /*const get_posts = process.env.NEXT_PUBLIC_BASE_URL + `posts`
  const { data: posts_data } = useSWR<PostData>(get_posts, {
    revalidateIfStale: false, revalidateOnFocus: false,
    //refreshInterval: 1000 
  })*/
  
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
          //setMicropost(res.data)
          console.log("FeedContent", res.data)
        })
        .catch((error) => {
          console.log(error)
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
            <li 
              className="list-none"
              key={data.id} 
              id={`post-${data.id}`}
            >
              <hr className="border-gray-200 dark:border-gray-700" />
              <MicropostCard id={data.user_id} post={data} />
            </li> 
          </>
        ))}
      </>
    )
  }, [FeedContent])
  
  //const { ReloadFetching } = useRecoilValue(FeedReloadUrlSelector)  
  
  //useEffect(() => {
  //  ReloadFetching()
  //}, [FeedContent])
  
  
  return(
    <>
      <Layout>
        <div className="inset-0  pb-5 md:pb-10 sm:px-6 lg:px-10">
          <div className="z-0 rounded-b-lg border-r-2 border-b-2 border-l-2 border-gray-200 dark:border-gray-700">
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <>
                <MicropostForm />
                <hr className="border-gray-200 dark:border-gray-700" />
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
