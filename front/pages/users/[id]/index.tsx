import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { MicropostType } from "types/MicropostType"
import { FollowType } from "types/FollowType"
import axios from "axios"
import Cookies from "js-cookie"
//import { MdSettings } from "react-icons/md"
//import { Auth } from "modules/Auth"
import useSWR from "swr"

import Layout from "components/Layout"
import { UnFollowButton } from "components/Users/UnFollowButton"
import { FollowButton } from "components/Users/FollowButton"

type ProfileDataType = {
  id: number,
  name: string,
  email: string,
  post: MicropostType[],
  posts_count: number,
  //relationship: FollowType[],
  relationship: {
    id: number,
    followed_id: number,
    //follower_id: number,
  } 
}

type FollowingUserData = {
  following_user: number,
  followedId: number
}

type FollowerUserData = {
  follower_user: number,
  followerId: number
}

type LoginUserData = {
  id: number,
}

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
  
  const following_user = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/following_user`
  
  /*
  const { data: following_user_data } = useSWR<FollowingUserData>(following_user, {
    revalidateIfStale: false, revalidateOnFocus: false
  })
  */
  
  const [followingUser, setFollowingUser] = useState<FollowingUserData>({
    following_user: 0,
    followedId: 0
  })
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios(following_user, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setFollowingUser(res.data)
      })
  }, [id])
  
  
  const follower_user = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/follower_user`
  
  /*
  const { data: follower_user_data } = useSWR<FollowerUserData>(follower_user, {
    revalidateIfStale: false, revalidateOnFocus: false
  })
  */
  
  const [followerUser, setFollowerUser] = useState<FollowerUserData>({
    follower_user: 0,
    followerId: 0
  })
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios(follower_user, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setFollowerUser(res.data)
      })
  }, [id])
  
  const login_user = process.env.NEXT_PUBLIC_BASE_URL + `users/${id}/login_user`
  
  const { data: login_user_data } = useSWR<LoginUserData>(login_user, { 
    revalidateIfStale: false, revalidateOnFocus: false
  })
  
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
                  [id: {profileData?.id}, Name: {profileData?.name}, login_user: {login_user_data?.id}]
                </h1>
              </div>
              <div className="md:ml-5 mt-4 md:mt-8 flex items-center space-x-8 text-sm">
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.posts_count}件</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">投稿</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{followingUser.following_user}{/*following_user_data?.following_user*/}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">フォロー中</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{followerUser.follower_user}{/*follower_user_data?.follower_user*/}人</h2>
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
        {profileData && login_user_data?.id == followingUser.followedId  ? (
            <UnFollowButton id={id} followed_id={profileData?.relationship.followed_id} relationship={profileData?.relationship} />
          ):(
            <FollowButton followed_id={id} id={id} />
        )}
      </div>
    </Layout>
  )
}
export default Profile
