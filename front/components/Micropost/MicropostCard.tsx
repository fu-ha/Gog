import { useState, useEffect } from "react"
import Link from "next/link"
import useSWR from "swr"
//import { useForm } from "react-hook-form"
//import { useUserSWR } from "hooks/useUserSWR"
import TimeAgo from "react-timeago"
import { MicropostType } from "types/MicropostType"
import { MicropostLikeType } from "types/MicropostLikeType"
//import { ImageTag } from "components/ImageTag"
import { MicropostLike } from "../Micropost/MicropostLike"
import { MicropostDelete } from "../Micropost/MicropostDelete"
import { CommentForm } from "components/Comment/CommentForm"
//import { UserValueType} from "types/UserType"
//import axios from "axios"
//import Cookies from "js-cookie"
//import { useUserSWR } from "hooks/useUserSWR"
import moment from "moment" 
import "moment/locale/ja"
import { MdMoreVert } from "react-icons/md"

//const get_user_url = process.env.NEXT_PUBLIC_BASE_URL + 'users'

type MicropostCardProps = {
  id: number,
  post: MicropostType,
  //post_like: MicropostLikeType
}

const MicropostCard = ({ id, post }: MicropostCardProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL + 'users/' + id
  
  const { data: user_data } = useSWR(url, {
    revalidateIfStale: false,
    revalidateOnFocus: false
  })
  
  const [isOpen, setIsOpen] = useState(false)
  
  return(
    <div className="max-w px-5 pt-4 pb-1 mx-auto bg-white rounded-sm shadow-md dark:bg-gray-800">
      <div className="flex">
      <Link href="/microposts/[id]" as={`/microposts/${post.id}`}>
        <div className="flex-1 flex">
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
            <p>UserId: {post.user_id} / {user_data?.id} </p>
            <p>PostId: {post.id}</p>
          </div>
            <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
              名前： {post.user.name}
            </p>
            <p className="ml-2 mt-1 flex flex-col text-xs text-gray-700 dark:text-gray-200">
              {moment(post.created_at).fromNow()} 
            </p>
        </div>
      </Link>
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
              <MdMoreVert />
          </button>
          <div>
            {user_data?.id == post.user_id && (
              <>
                {isOpen && (
                  <div className="absolute z-10 right-0 w-40 shadow-lg ">
                    <MicropostDelete id={post.id} />
                  </div>
                )}
              </>
            )} 
          </div>
        </div>
      </div>
      <Link href="/microposts/[id]" as={`/microposts/${post.id}`}>
        <div className="ml-12">
          <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {post.content}</p>
        </div>
      </Link>
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
        <MicropostLike 
          id={id} 
          user_id={post.user.id} 
          //user_id={user_id}
          post_id={post.id}
          //post_id={post_id}
          //post_liked//={post_like.post_liked}
          post_liked//={post.post_liked}
          //liked_icon 
          post={post} 
          //liked_count={post.liked_count} 
        />
      </div>
      <hr className="my-1 border-gray-200 dark:border-gray-600" />
      <CommentForm id={post.id} />
    </div>   
  )
}

export default MicropostCard
