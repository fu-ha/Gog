import { useState } from "react"
import Link from "next/link"
// import Image from "next/image"
import useSWR from "swr"
import { MicropostType } from "types/MicropostType"
import { MicropostLike } from "../Micropost/MicropostLike"
import { MicropostDelete } from "../Micropost/MicropostDelete"
import { MicropostComments } from "../Micropost/MicropostComments" 
import moment from "moment" 
import "moment/locale/ja"
import { MdMoreHoriz } from "react-icons/md"

type MicropostCardProps = {
  id: number,
  post: MicropostType,
}

type CurrentUserData = {
  login_user: {
    id: number
  }
}

const MicropostCard = ({ id, post }: MicropostCardProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL + 'users/' + id
  const [isOpen, setIsOpen] = useState(false)
  
  const { data: user_data } = useSWR<CurrentUserData>(url, {
    revalidateIfStale: false,
    revalidateOnFocus: false
  })
  
  return(
    <div className="max-w pb-2 md:pb-4 px-2.5 md:px-5 pt-2 md:pt-4 mx-auto md:rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex">
        <div className="flex-1 flex">
          <Link /*href="/users/[id]" as*/ href={`/users/${id}`}>
            <div className="rounded-circle mr-2">
              {post.user.image?.url ? (
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={post.user.image?.url}
                  alt="avatar"
                />
              ) : (
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
              )}
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
            <div className="flex flex-col">
              <div className="flex">
                <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                  {post.user?.name}
                </p>
                <p className="ml-2 md:ml-3 mt-1.5 flex flex-col text-xs text-gray-500 dark:text-gray-400">
                  {moment(post.created_at).fromNow()} 
                </p>
              </div>  
              {post.tag && (
                <div className="flex items-center justify-center shrink rounded-md  md:my-1 bg-blue-300 dark:bg-blue-900">
                  <p className="mx-1.5 text-sm text-gray-700 dark:text-gray-200">{post.tag}</p>
                </div>
              )}
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
                  <div className="absolute z-10 right-0 w-40 rounded-md shadow-lg bg-gray-300 dark:bg-gray-700">
                    <MicropostDelete id={post.id} />
                  </div>
                )}
              </div>
            </>
          )} 
        </div>
      </div>
      <Link /*href="/microposts/[id]" as*/ href={`/microposts/${post.id}`}>
        <div className="ml-12 mb-2 md:mb-5">
          <p className="mt-2 text-gray-700 dark:text-gray-200">{post.content}</p>
        </div>
      </Link>
      {post.image?.url && (
        <div className="flex justify-center mb-2 md:mb-5">
          <img
            src={post.image.url}
            className="object-cover w-5/6 h-40 md:h-80 rounded-md"
            alt="post_image"
          />
      　{/*post.image?.url && (
           <span className="my-3">
            <Image
              src={post.image.url}
              height={200}
              width={500}
              alt="post_image"
              className="mx-auto rounded-lg"
            />
          </span>
        )*/}
        {/*<img 
          src="https://www.hyperui.dev/photos/man-4.jpeg"
          className="object-cover w-full h-80"
          alt="post image"
        />*/}
        </div>
      )}
      <div className="flex ml-12">
        <MicropostLike post={post} />
        <MicropostComments post={post} />
      </div>
    </div>   
  )
}

export default MicropostCard
