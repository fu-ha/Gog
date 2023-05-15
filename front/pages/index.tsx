import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRecoilState } from "recoil"
import { FeedContentAtom } from "../atom/FeedContentAtom"
import Layout from "../components/Layout"
import { MicropostForm } from "../components/Micropost/MicropostForm"
import MicropostCard from "../components/Micropost/MicropostCard"
import SelectMicropostTag from "../components/Micropost/SelectMicropostTag"

const Index = () => {
  const [isClient, setIsClient] = useState(false)
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  
  const post_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts'
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true)
    
    const handleFetch = async () => {
      await axios(post_url, { 
        headers: {
    　     "access-token": Cookies.get("access-token") || "",
    　     "client": Cookies.get("client") || "",
    　     "uid": Cookies.get("uid") || ""
        }
      })　
        .then((res) => {
          setFeedContent(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    handleFetch()
  }, [])
  
  // const Post_List = useMemo(() => {
  //   return(
  //     <ul>
  //       {FeedContent && FeedContent.map((data) => (
  //         <li 
  //           className="list-none mb-3 md:mb-5"
  //           key={data.id} 
  //           id={`post-${data.id}`}
  //         >
  //           <MicropostCard id={data.user_id} post={data} />
  //         </li> 
  //       ))}
  //     </ul>
  //   )
  // }, [FeedContent])
  
  
  return(
    <>
      <Layout>
        <div className="inset-0 md:py-2 sm:px-6 lg:px-10">
          <div className="z-0 md:rounded-b-lg ">
          　{isClient && Cookies.get("access-token") && Cookies.get("client") && Cookies.get("uid") && (
          　   <>
            　   <MicropostForm />
                <SelectMicropostTag />
                <div>{/*Post_List*/}</div>
                <div>
                  <ul>
                    {FeedContent && FeedContent.map((data) => (
                      <li 
                        className="list-none mb-3 md:mb-5"
                        key={data.id} 
                        id={`post-${data.id}`}
                      >
                        <MicropostCard id={data.user_id} post={data} />
                      </li> 
                    ))}
                  </ul>
                </div>
              </>
          　)}
          　{isClient && !Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid") && (
              <div className="z-0 my-8 md:my-0 p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400">投稿するにはログイン・新規登録、またはゲストログインしてください。</p>
              </div>
            )}
          </div>            
        </div>
      </Layout>
    </>  
  )
}

export default Index
