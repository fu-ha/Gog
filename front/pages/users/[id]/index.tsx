import { useState, useEffect } from "react"
import { useRouter } from "next/router"
//import Image from "next/image"
import { MicropostType } from "types/MicropostType"
import axios from "axios"
import Cookies from "js-cookie"
//import useSWR from "swr"
import Layout from "components/Layout"
import { UnFollowButton } from "components/Users/UnFollowButton"
import { FollowButton } from "components/Users/FollowButton"

type ProfileDataType = {
  id: number,
  name: string,
  email: string,
  post: MicropostType[],
  posts_count: number,
  relationship: {
    data: {
      id: number,
      user_id: number,
      follow_id: number,
    },
    following: number,
    follower: number,
  },
  login_user: {
    id: number
  }
}

//type LoginUserData = {
//  id: number,
//}

const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL + "users/" + id
  
  const [profileData, setProfileData] = useState<ProfileDataType>()
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios(BaseUrl, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setProfileData(res.data)
      })
  }, [id])
  
/*
  const login_user = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/login_user`
  
  const { data: login_user_data } = useSWR<LoginUserData>(login_user, { 
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
const [loginUser, setLoginUser] = useState<LoginUserData>()
  
  useEffect(() => {
    axios(login_user, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setLoginUser(res.data)
      })
  }, [])
*/  
  return(
    <Layout>
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="px-2 flex sm:items-start sm:space-x-4 relative sm:mb-3">
          <div className="mt-5 md:mt-8 md:mr-10 sm:mt-4 lg:mt-8 in-line block relative h-20 w-20 md:h-32 md:w-32">
            <span className="inline-block flex-shrink-0 overflow-hidden rounded-full h-full w-full  ring-2 sm:ring-4 md:ring-2 lg:ring-4 ring-gray-600 dark:ring-gray-400 ">
              {//<Image 
                //src=""
                //height={28}
                //width={28}
                //alt="profile"
              ///>
              }
            </span>
          </div>
          <div className="mt-5 md:mt-8 ml-4 md:ml-8 flex-1 min-w-0 flex flex-row items-start justify-between space-x-6">
            <div className="flex-1">
              <div className="md:ml-5 flex items-center flex-wrap">
                <h1 className="mr-8 text-center flex-shrink text-lg lg:text-2xl font-bold text-gray-600 dark:text-gray-400 truncate mr-1 lg:mr-2">
                  [id: {profileData?.id}, Name: {profileData?.name}, login_user: {/*login_user_data?.id*/} {profileData?.login_user?.id}]
                </h1>
              </div>
              <div className="md:ml-5 mt-4 md:mt-8 flex items-center space-x-8 text-sm">
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.posts_count}件</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">投稿</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.relationship?.following} {/*followingUser.following_user*/}{/*following_user_data?.following_user*/}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">フォロー中</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.relationship?.follower} {/*followerUser.follower_user*/}{/*follower_user_data?.follower_user*/}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 font-bold text-gray-700 dark:text-gray-400">フォロワー</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-8 text-center">
          <button 
            className="w-full md:py-1 rounded border border-gray-600 dark:border-gary-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gary-700 dark:hover:text-gray-200"
          >
            <h2 className="text-gray-600 dark:text-gray-400">プロフィールを編集</h2>
          </button>
        </div>
        {/*profileData && login_user_data?.id == profileData?.relationship.user_id ? (
          <UnFollowButton id={id} relationship={profileData?.relationship} />
        ):(
          <FollowButton id={id} relationship={profileData?.relationship} />
        )*/}
        {profileData && profileData?.login_user?.id !== profileData?.id && (
          <>
            {profileData?.login_user?.id == profileData?.relationship?.data?.user_id && (
              <UnFollowButton id={id} relationship={profileData?.relationship.data} />
            )}
            {profileData?.login_user?.id !== profileData?.relationship?.data?.user_id && (
              <FollowButton id={id} user_id={profileData?.login_user?.id} follow_id={id} />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
export default Profile
