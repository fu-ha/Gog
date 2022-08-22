import { useState, useEffect, useMemo } from "react"
//import { MdClear } from "react-icons/md"
import { useRecoilValue, useRecoilState } from "recoil"
import { FeedContentAtom } from "atom/FeedContentAtom"
//import { useUserSWR } from "hooks/useUserSWR"
//import useSWR from "swr"
import Cookies from "js-cookie"
import axios from "axios"
import Layout from "components/Layout"
import { MicropostType } from "types/MicropostType"
import MicropostForm from "components/Micropost/MicropostForm"
import MicropostCard from "components/Micropost/MicropostCard"
//import InfiniteScroll from "react-infinite-scroller"
import { useFeedFetch } from "hooks/useFeedFetch"

//const authentication_url = process.env.NEXT_PUBLIC_BASE_URL + "auth/sessions"
const url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'

const Index = () => {
  //const { user_data } = useUserSWR()
  const [isClient, setIsClient] = useState(false)
  //const [posts, setPosts] = useState()
  //const FeedContent = useRecoilValue(FeedContentAtom)
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  //const { handleFetching, isHavingPosts } = useFeedFetch()
  
  /*axios.get(authentication_url, {
    headers: {
      "access-token": Cookies.get("access-token") || "",
      "client": Cookies.get("client") || "",
      "uid": Cookies.get("uid") || ""
    }
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })*/
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
  const loader = <div className="loader">...</div>
  
  /*const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && (
          <>
            {FeedContent.posts.map((post) => (
              <li key={post.id} id={`post-${post.id}`}>
                <MicropostCard post={post} name={post.name} />
              </li>   
            ))}
          </>
        )}
      </>
    )
  }, [FeedContent])*/
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && FeedContent.map((post: any) => (
          <li key={post.id} id={`post-${post.id}`}>
            <MicropostCard post={post} name={post.name} />
          </li>   
        ))}
      </>
    )
  }, [FeedContent])
  
  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setFeedContent(response.data)
    })
  })
  
  return(
    <>
      <Layout>
        <div className="inset-0 px-4 py-6 sm:px-6 lg:px-10">
          <div className="space-y-5 z-0">
            {isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
              <>
                <MicropostForm />
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
