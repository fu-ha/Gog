//import { useState, useEffect, useMemo } from "react"
//import { useForm } from "react-hook-form"
//import { useUserSWR } from "hooks/useUserSWR"
import TimeAgo from "react-timeago"
import { MicropostType } from "types/MicropostType"
//import { ImageTag } from "components/ImageTag"
import { MicropostLike } from "components/Micropost/MicropostLike"
//import { UserValueType } from "types/UserType"
//import axios from "axios"
//import { useUserSWR } from "hooks/useUserSWR"
import moment from 'moment' 
import 'moment/locale/ja'

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
    
    <div className="max-w px-5 py-4 mx-auto bg-white rounded-sm shadow-md dark:bg-gray-800">
      <div className="flex">
        <div className="rounded-circle mr-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://www.hyperui.dev/photos/man-4.jpeg"
          />
          {/*<img
            className="object-cover w-10 h-10 rounded-full"
            src="../img/a1.JPG"
            alt="User Icon"
          />*/}
          {/*<ImageTag 
            src="https://www.hyperui.dev/photos/man-4.jpeg"
            width={16}
            height={16}
            className="object-cover w-10 h-10 rounded-full"
            alt="usericon"
          />*/}
        </div>
        <div className="flex flex-col">
          <p>UserId: {post.user.id}</p>
          <p>PostId: {post.id}</p>
          <p className="text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">名前： {post.user.name}</p>
          <p className="flex flex-col text-xs text-gray-700 dark:text-gray-200">
            <TimeAgo date={new Date(post.created_at)}></TimeAgo>
            {moment(post.created_at).fromNow()} 
          </p>
        </div>
      </div>
      <div className="">
        <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {post.content}</p>
      </div>
      <div className="">
        {/*post.image?.url && (
          <ImageTag 
            src={post.image.url}
            height={80}
            width={80}
            //alt="post_image"
            className="object-cover w-full"
          />
        )*/}
      　{/*post.image?.url && (
          <img
            src={post.image.url}
            className="object-cover w-full md:h-80"
            alt="post_image"
          />
        )*/}
        {/*<img 
          src="https://www.hyperui.dev/photos/man-4.jpeg"
          className="object-cover w-full h-80"
          alt="post image"
        />*/}
      </div>
      <div className="">
        <MicropostLike id={post.id} user_id={post.user.id} post_id={post.id} />
      </div>
    </div>        
  )
}

export default MicropostCard
