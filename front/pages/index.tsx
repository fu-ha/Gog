import { useState, useEffect, useMemo } from "react"
//import { MdClear } from "react-icons/md"
import { useRecoilValue } from "recoil"
//import { useUserSWR } from "hooks/useUserSWR"
//import useSWR from "swr"
import { FeedContentAtom } from "atom/FeedContentAtom"
//import { Auth } from "modules/Auth"
import Cookies from "js-cookie"
//import axios from "axios"

//component//
import Layout from "components/Layout"
import MicropostForm from "components/Micropost/MicropostForm"
import MicropostCard from "components/Micropost/MicropostCard"
//import X from "components/xx"

const Index = () => {
  //const { user_data } = useUserSWR()
  const [isClient, setIsClient] = useState(false)
  const FeedContent = useRecoilValue(FeedContentAtom)
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && ( 
          <>
            {FeedContent.posts.map((post) => (
              <div>
                <MicropostCard post={post} name={post.name} />
              </div>
            ))}
          </>
        )}
      </>
    )
  }, [FeedContent])
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
  }, [])
  
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
