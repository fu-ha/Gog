import { useState, useEffect, useMemo } from "react"
//import { MdClear } from "react-icons/md"
import { useRecoilValue, useRecoilState } from "recoil"
import { FeedContentAtom } from "atom/FeedContentAtom"
import { useUserSWR } from "hooks/useUserSWR"
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
  const [post, setPost] = useState<PostData>()
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
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
  useEffect(() => {
    axios.get(post_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        setFeedContent(res.data)
        setPost(res.data)
        console.log("post_url!!!")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && FeedContent.map((post) => (
          <li 
            className="list-none"
            key={post.id} 
            id={`post-${post.id}`}
          >
            <hr className="border-gray-200 dark:border-gray-700" />
            <MicropostCard id={post.user_id} post={post} />
          </li>   
        ))}
      </>
    )
  }, [FeedContent])
  
  return(
    <>
      <Layout>
        <div className="inset-0 px-4 pb-10 sm:px-6 lg:px-10">
          <div className="space-y-5 pb-5 z-0 rounded-b-lg border-r-2 border-b-2 border-l-2 border-gray-200 dark:border-gray-700">
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <>
                <MicropostForm id={post?.id} />
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
