import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { useSWRConfig } from "swr"
//import { useForm } from "react-hook-form"
//import { useUserSWR } from "hooks/useUserSWR"
//import TimeAgo from "react-timeago"
import { MicropostType } from "types/MicropostType"
//import { MicropostLikeType } from "types/MicropostLikeType"
//import { ImagePost } from "components/ImagePost"
import { MicropostLike } from "../Micropost/MicropostLike"
import { MicropostDelete } from "../Micropost/MicropostDelete"
import { MicropostComments } from "../Micropost/MicropostComments" 
//import { CommentForm } from "components/Comment/CommentForm"
//import { UserValueType} from "types/UserType"
import axios from "axios"
import Cookies from "js-cookie"
//import { useUserSWR } from "hooks/useUserSWR"
import moment from "moment" 
import "moment/locale/ja"
import { MdMoreHoriz } from "react-icons/md"
//import { MdMoreVert } from "react-icons/md"
//import { MdChatBubble } from "react-icons/md"
import { useFlashMessage } from "hooks/useFlashMessage"

type MicropostCardProps = {
  id: number,
  post: MicropostType,
}

type CurrentUserData = {
  login_user: {
    id: number
  }
}

type PostIdData = {
  id: number
}

const MicropostCard = ({ id, post }: MicropostCardProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL + 'users/' + id
  const post_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}`
  const fetch_post = process.env.NEXT_PUBLIC_BASE_URL + `posts`
  
  const { data: user_data } = useSWR<CurrentUserData>(url, {
    revalidateIfStale: false,
    revalidateOnFocus: false
  })
  
  //const { mutate } = useSWRConfig()
  
  const { data: posts_data } = useSWR<PostIdData>(post_url, {
    revalidateIfStale: false,
    revalidateOnFocus: true
  })
  
  const [isOpen, setIsOpen] = useState(false)

  const fetch = async () => {
    await axios(fetch_post, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
      .then((res) => {
        console.log(res.data)
      })
  }
  useEffect(() => {
    fetch()
  }, [isOpen])
  
  return(
    <div className="max-w pb-2 md:pb-4 px-2.5 md:px-5 pt-2 md:pt-4 mx-auto md:rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex">
        <div className="flex-1 flex">
          <Link /*href="/users/[id]" as*/ href={`/users/${id}`}>
            <div className="rounded-circle mr-2">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
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
          </Link>
          <Link /*href="/microposts/[id]" as*/ href={`/microposts/${post.id}`}>
            <div className="flex">
              <div className="flex flex-col">
                <p>UserId: {post.user_id} / {user_data?.login_user.id} </p>
                <p>PostId: {post.id} </p>
                {post.tag && (
                  <p>Tag: {post.tag}</p>
                )}
              </div>
              <div className="flex">
                <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                  名前： {post.user?.name}
                </p>
                <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-700 dark:text-gray-200">
                  {moment(post.created_at).fromNow()} 
                </p>
              </div>  
            </div>
          </Link>
        </div>
        <div className="relative inline-block">
          {user_data?.login_user.id == post.user_id && (
            <>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <MdMoreHoriz />
              </button>
              <div>
                {isOpen && (
                  <div className="absolute z-10 right-0 w-40 shadow-lg ">
                    <MicropostDelete id={post.id} />
                  </div>
                )}
              </div>
            </>
          )} 
        </div>
      </div>
      <Link /*href="/microposts/[id]" as*/ href={`/microposts/${post.id}`}>
        <div className="ml-12">
          <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {post.content}</p>
        </div>
      </Link>
      <div className="flex justify-center">
        {post.image?.url && (
          <span className="my-3">
            <Image
              src={post.image.url}
              height={200}
              width={500}
              alt="post_image"
              className="mx-auto"
            />
          </span>
        )}
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
      <div className="flex ml-12">
        <MicropostLike post={post} />
        <MicropostComments post={post} />
      </div>
      {/*<CommentForm post_id={post.comment?.post_id} content={post.comment?.content} />*/}
    </div>   
  )
}

export default MicropostCard
