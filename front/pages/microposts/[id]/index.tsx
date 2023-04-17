import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
// import Image from "next/image"
//import useSWR from "swr"
//import { useRecoilState } from "recoil"
//import { FeedContentAtom } from "atom/FeedContentAtom"
//import { FeedCommentAtom } from "atom/FeedCommentAtom"
import { MicropostLike } from "components/Micropost/MicropostLike"
import { MicropostDelete } from "components/Micropost/MicropostDelete"
import { CommentForm } from "components/Comment/CommentForm"
import { CommentList } from "components/Comment/CommentList"
import axios from "axios"
import Cookies from "js-cookie"
import Layout from "components/Layout"
import moment from "moment"
import "moment/locale/ja"
import { MdMoreHoriz } from "react-icons/md"
import { MicropostType } from "types/MicropostType"

type CurrentUserData = {
  login_user: {
    id: number
  }
}

const MicropostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [currentUser, setCurentUser] = useState<CurrentUserData>()
  const [data, setData] = useState<MicropostType>()
  const [isOpen, setIsOpen] = useState(false)
  
  const post_show_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id
  const current_user_url = process.env.NEXT_PUBLIC_BASE_URL + 'users'
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    
    axios(post_show_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => { 
        setData(res.data) 
      })
      
    axios(current_user_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => { 
        setCurentUser(res.data[0]) 
      })
  }, [id])
  
  return(
    <Layout>
      {data && (
        <div className="inset-0 py-3 md:py-10 sm:px-6 lg:px-10">
          <div className="space-y-5 z-0 md:rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="max-w px-5 py-4 mx-auto">
              <div className="flex">
                <div className="flex-1 flex">
                  <Link /*href="/users/[id]" as*/ href={`/users/${data.user.id}`}>
                    <div className="rounded-circle mr-2">
                      {data.user.image?.url ? (
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={data.user.image?.url}
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
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                        {data.user.name}
                      </p>
                      <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-500 dark:text-gray-400">
                        {moment(data.created_at).fromNow()} 
                      </p>
                    </div>
                    <div className="flex items-center justify-center shrink rounded-md  md:my-1 bg-gray-100 dark:bg-blue-900">
                      <p className="text-sm">{data.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="relative inline-block">
                  {currentUser?.login_user?.id == data.user_id && (
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
                          <div className="absolute z-10 right-0 w-40 rounded-md shadow-lg bg-gray-200 dark:bg-gray-700">
                            <MicropostDelete id={data.id} />
                          </div>
                        )}
                      </div>
                    </>
                  )} 
                </div>
              </div>   
              <div className="ml-12 mb-2 md:mb-5">
                <p className="mt-3 text-gray-600 dark:text-gray-300">{data.content}</p>
              </div>
              {data.image?.url && (
                <div className="flex justify-center mb-2 md:mb-5">
                  <img
                    src={data.image?.url}
                    className="object-cover w-5/6 h-20 md:h-40"
                    alt="post_image"
                  />
      　         {/*post.image?.url && (
                  <span className="my-3">
                    <Image
                      src={data.image.url}
                      height={200}
                      width={500}
                      alt="post_image"
                      className="mx-auto"
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
              <div className="ml-12 mb-2">
                <MicropostLike post={data} />
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <CommentForm post={data} id={data.comment?.id} post_id={data.comment?.post_id} />
            </div>
            <div>
              <CommentList id={data.id} post={data} post_id={data.comment?.post_id}/>
            </div>
          </div>
        </div>
      )}
    </Layout>  
  )
}

export default MicropostPage
