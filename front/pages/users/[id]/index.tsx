import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
//import Image from "next/image"
import { MicropostType } from "types/MicropostType"
import axios from "axios"
import Cookies from "js-cookie"
import { OpenModalAtom } from "atom/OpenModalAtom"
import Layout from "components/Layout"
import { UnFollowButton } from "components/Users/UnFollowButton"
import { FollowButton } from "components/Users/FollowButton"
import { UserPostList } from "components/Users/UserPostList"
import { ImageUploadModal } from "components/Users/ImageUploadModal"

type ProfileDataType = {
  id: number,
  name: string,
  // image?: string,
  image?: {
    url: string,
  },
  email: string,
  post: MicropostType[],
  posts: MicropostType[],
  posts_count: number,
  relationship: {
    data: {
      id: number,
      user_id: number,
      follow_id: number,
    },
    following: number,
    follower: number,
    if_follow: {
      id: number,
      user_id: number,
      follow_id: number,
    }
  },
  login_user: {
    id: number
  }
}

const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const Profile_Url = process.env.NEXT_PUBLIC_BASE_URL + "users/" + id
  const [profileData, setProfileData] = useState<ProfileDataType>()
  // const [openModal, setOpenModal] = useState(false)
  const [OpenModal, setOpenModal] = useRecoilState(OpenModalAtom)
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios.get(Profile_Url, {
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
   
  return(
    <div>
    <Layout>
      <div className="relative md:max-w-2xl mx-auto ">
         <div className="px-2 flex sm:items-start sm:space-x-4 relative sm:mb-3">
          <div className="mt-5 md:mt-8 ml-8 md:ml-20 sm:mt-4 lg:mt-8 in-line block relative h-20 w-20 md:h-32 md:w-32">
            <span className="inline-block flex-shrink-0 overflow-hidden rounded-full h-full w-full ring-2 sm:ring-4 md:ring-2 lg:ring-4 ring-gray-600 dark:ring-gray-400 ">
              {//<Image 
                //src=""
                //height={28}
                //width={28}
                //alt="profile"
              ///>
              }
              {profileData?.image?.url ? (
                <img 
                  className="object-cover h-32 w-32 rounded-full"
                  src={profileData?.image?.url}
                  alt="avatar"
                />
              ) : (
                <img
                  className="object-cover h-32 w-32 rounded-full"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
              )}
            </span>
          </div>
          <div className="mt-5 md:mt-8 ml-3 md:ml-8 flex-1 min-w-0 flex flex-row items-start justify-between space-x-6">
            <div className="flex-1">
              <div className="flex-1 md:ml-5 flex items-center flex-wrap">
                <h1 className="ml-6 mr-6 text-center flex-shrink text-lg lg:text-2xl font-bold text-gray-600 dark:text-gray-400 truncate mr-1 lg:mr-2">
                  {profileData?.name}
                </h1>
                {profileData?.login_user?.id == profileData?.relationship?.if_follow?.user_id && (
                  //ログインユーザーのidがプロフユーザーがフォローされたユーザーのidと同じ。(ログインユーザーがプロフユーザーをフォロー済みかどうか)
                  <div className="md:ml-5 border rounded-md border-gray-600 dark:border-gray-400">
                    <a 
                      className="p-1 text-sm font-bold text-gray-600 dark:text-gray-400"
                      href={`/rooms`}
                    >
                      メッセージを送信
                    </a>
                  </div>
                )}
              </div>
              <div className="flex mr-6 md:mr-8 ml-0 md:ml-5 mt-5 md:mt-8 items-center space-x-4 md:space-x-8 text-sm">
                <div className="flex-1 text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.posts_count}件</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">投稿</h2>
                </div>
                <div className="flex-1 text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.relationship?.following} {/*followingUser.following_user*/}{/*following_user_data?.following_user*/}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">フォロー中</h2>
                </div>
                <div className="flex-1 text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData?.relationship?.follower} {/*followerUser.follower_user*/}{/*follower_user_data?.follower_user*/}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 font-bold text-gray-700 dark:text-gray-400">フォロワー</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {profileData && profileData?.login_user?.id !== profileData?.id && (
          //↑プロフィールページのidがログインユーザー以外か。
          <>
            {profileData?.id == profileData?.relationship?.if_follow?.follow_id && profileData?.login_user?.id == profileData?.relationship?.if_follow?.user_id &&
            　//↑プロフィールidとログインユーザーがフォローしたユーザーのidが同じか。かつ、ログインユーザーのidとプロフユーザーがフォローされたユーザーのidが同じ。
              <UnFollowButton relationship={profileData?.relationship?.data} />
            }
            {profileData?.id !== profileData?.relationship?.if_follow?.follow_id && profileData?.login_user?.id !== profileData?.relationship?.if_follow?.user_id &&
            　//↑プロフィールidとログインユーザーがフォローしたユーザーのidが異なる。かつ、ログインユーザーのidとプロフユーザーがフォローされたユーザーのidが異なる。
              // follow_id...フォローされた人になる（idページのユーザー）   user_id...フォローする側の人（ログインユーザー）
              <FollowButton user_id={profileData?.login_user?.id} follow_id={profileData?.id} />
            }
          </>
        )}
        <div className="mt-4 md:mt-6 text-center">
          <button 
            className="w-5/6 md:py-1 rounded border border-gray-600 dark:border-gary-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gary-700 dark:hover:text-gray-200"
            onClick={() => setOpenModal(!OpenModal)}
          >
            <h2 className="text-gray-600 dark:text-gray-400">プロフィール画像を編集</h2>
          </button>
        </div>
        <div className="pt-5">
          <hr className="border border-gray-200 dark:border-gray-700" />
          <UserPostList id={profileData?.id} profileData={profileData} />
        </div>
      </div>
    </Layout>
    <div>
      {OpenModal &&
        <ImageUploadModal id={profileData?.id} />
      }
    </div>
    </div>
  )
}
export default Profile
