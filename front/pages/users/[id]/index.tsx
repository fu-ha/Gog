import { useState, useEffect } from "react"
import { PostType } from "types/PostType"
import axios from "axios"
//import { MdSettings } from "react-icons/md"
//import { Auth } from "modules/Auth"

import { useUserSWR } from "../../../hooks/useUserSWR";
import { useRelationshipsSWR } from "../../../hooks/useRelationshipsSWR"

import Layout from "components/Layout"

type ProfilePropsType = {
  id: string
}

type ProfileDataType = {
  id: number | null,
  name: string,
  email: string,
  image_url: string,
  posts: PostType[],
  posts_count:number,
  following_count: number,
  followers_count: number
}

const Profile = ({ id }: ProfilePropsType) => {
  
  const { user_data } = useUserSWR();

  const { Is_following_func } = useRelationshipsSWR();
  
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL + "users/" + id
  
  const [profileData, setProfileData] = useState<ProfileDataType>({
    id: null,
    name: "",
    email: "",
    image_url: "",
    posts: [],
    posts_count: 0,
    following_count: 0,
    followers_count: 0,
  })
  
 useEffect(
    function () {
      if (id === undefined) {
        return;
      }
      axios(BaseUrl)
        .then(res => res.data)
        .then((profile_data) => {
          console.log({ profile_data });
          setProfileData(profile_data);
          //const totalPage = Math.ceil(data.microposts.length / maxPerPage);
          //setPageState(Object.assign({ ...pageState }, { totalPage }));
          //let target_date = new Date(data.created_at);
          // console.log({ target_date })
          //setCreatedDate(target_date);
        });
    },
    [id]
  );
  
  return(
    <Layout>
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="px-2 flex sm:items-start sm:space-x-4 relative sm:mb-3">
          <div className="mt-5 md:mt-8 md:mr-10 sm:mt-4 lg:mt-8 in-line block relative h-20 w-20 md:h-32 md:w-32">
            <span className="inline-block flex-shrink-0 overflow-hidden rounded-full h-full w-full  ring-2 sm:ring-4 md:ring-2 lg:ring-4 ring-gray-600 dark:ring-gray-400 ">
              <img className="" src="" alt="UserIcon"/>
            </span>
          </div>
          <div className="mt-5 md:mt-8 ml-4 md:ml-8 flex-1 min-w-0 flex flex-row items-start justify-between space-x-6">
            <div className="flex-1">
              <div className="md:ml-5 flex items-center flex-wrap">
                <h1 className="mr-8 text-center flex-shrink text-lg lg:text-2xl font-bold text-gray-600 dark:text-gray-400 truncate mr-1 lg:mr-2">
                  [{profileData.name}]
                </h1>
              </div>
              <div className="md:ml-5 mt-4 md:mt-8 flex items-center space-x-8 text-sm">
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData.posts_count}件</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">投稿</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData.following_count}人</h2>
                  <h2 className="text-xs md:text-base md:mt-2 ml-1 font-bold text-gray-700 dark:text-gray-400">フォロー中</h2>
                </div>
                <div className="text-center">
                  <h2 className="text-xs md:text-base font-semibold text-gray-600 dark:text-gray-400">{profileData.followers_count}人</h2>
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
      </div>
    </Layout>
  )
}
export default Profile
