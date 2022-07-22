import { useMemo } from "react"
//import { MdClear } from "react-icons/md"
import { useRecoilValue } from "recoil"
//import { useUserSWR } from "hooks/useUserSWR"
//import useSWR from "swr"
import { FeedContentAtom } from "atom/FeedContentAtom"
import { Auth } from "modules/Auth"

import Layout from "components/Layout"
import MicropostForm from "components/Micropost/MicropostForm"
import MicropostCard from "components/Micropost/MicropostCard"

const Index = () => {
  //const { user_data } = useUserSWR()
  
  const FeedContent = useRecoilValue(FeedContentAtom)
  
  const Post_List = useMemo(() => {
    return(
      <>
        {FeedContent && ( 
          <>
            {FeedContent.microposts.map((post) => (
              <div>
                <MicropostCard post={post} name={post.name} />
              </div>
            ))}
          </>
        )}
      </>
    )
  }, [FeedContent])
  
  return(
    <>
      <Layout>
        <div className="inset-0 px-4 py-6 sm:px-6 lg:px-10">
          <div className="space-y-5 z-0">
            <div>
              <MicropostForm />
            </div>
            <div>
              {Auth.isLoggedIn() &&  (
                <>{Post_List}</>
              )}
              toukou
            </div>
          </div>            
        </div>
      </Layout>
    </>  
  )
}
export default Index
