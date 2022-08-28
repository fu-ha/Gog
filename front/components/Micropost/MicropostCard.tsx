//import { useState, useEffect, useMemo } from "react"
//import Image from "next/image"
//import { useForm } from "react-hook-form"
//import { useUserSWR } from "hooks/useUserSWR"
import TimeAgo from "react-timeago"
import { MicropostType } from "types/MicropostType"
//import { UserValueType } from "types/UserType"
//import axios from "axios"
//import { useUserSWR } from "hooks/useUserSWR"

//const get_user_url = process.env.NEXT_PUBLIC_BASE_URL + 'users'

type MicropostCardProps = {
  post: MicropostType
}

const MicropostCard = ({ post }: MicropostCardProps) => {
  //const { user_data } = useUserSWR()
  
  
  
  /*const Post_User_Name = useMemo(() => {
    return(
      <>
        {user_data?.user?.id == post.user_id && (
          <p className="text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">名前： {name}</p>
        )}
      </>
    )
  }, [user_data, post])*/
  
  return(
    
    <div className="max-w px-8 py-5 mx-auto bg-white rounded-sm shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div className="rounded-circle h-16 w-16">
            {/*<Image 
              src={post.image_url || ""}
              width={16}
              height={16}
              className="rounded-full"
              alt="usericon"
            />*/}
          </div>
          <div className="flex flex-col">
            <p>{post.user.id}</p>
            <p className="text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">名前： {post.user.name}</p>
            <p className="flex flex-col text-xs text-gray-700 dark:text-gray-200">
              <TimeAgo date={new Date(post.created_at)}></TimeAgo>
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <a href="#" className="text-base font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"></a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {post.content}</p>
      </div>
    </div>        
  )
}

export default MicropostCard
