import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
//import useSWR from "swr"
//import { useRecoilState } from "recoil"
//import { FeedContentAtom } from "atom/FeedContentAtom"
//import { FeedCommentAtom } from "atom/FeedCommentAtom"
import { PagesMicropostLike } from "components/PagesMicropostLike"
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

type PostShowData = {
  id: number,
  user_id: number,  
  content: string,
  created_at: string,
  tag?: string,
  liked_count: number,
  post_liked: boolean,
  post_like: {
    id: number,
    user_id: number,
    post_id: number,
  }
  user: {
    id: number,
    name: string,
    email: string,
  },
  comment: {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: string
  },
  comment_count: number,
  comment_like: {
    id: number,
    user_id: number,
    post_id: number,
    comment_id: number,
    created: string,
  }
}

type CommentDataType = {
  id: number,
  user_id: number, 
  post_id: number,
  content: string,
  created_at: string,
}

const MicropostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [currentUser, setCurentUser] = useState<CurrentUserData>()
  const [data, setData] = useState<MicropostType>()

  const [isOpen, setIsOpen] = useState(false)
  
  
  const post_show_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id
  
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
  }, [id])
  
  const current_user_url = process.env.NEXT_PUBLIC_BASE_URL + "users"
  
  useEffect(() => {
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
        <div className="inset-0 px-4 pb-10 sm:px-6 lg:px-10">
          <div className="space-y-5 z-0 rounded-b-lg border-r-2 border-b-2 border-l-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="max-w px-5 pt-4 mx-auto">
              <div className="flex">
                <div className="flex-1 flex">
                  <Link /*href="/users/[id]" as*/ href={`/users/${id}`}>
                    <div className="rounded-circle mr-2">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
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
                  <div className="flex flex-col">
                    <p>UserId: {data.user_id} / {currentUser?.login_user?.id}</p>
                    <p>PostId: {data.id}</p>
                    <p>Tag: {data.tag}</p>
                  </div>
                  <div className="flex">
                    <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                      名前： {data.user.name}
                    </p>
                    <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-700 dark:text-gray-200">
                      {moment(data.created_at).fromNow()} 
                    </p>
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
                          <div className="absolute z-10 right-0 w-40 shadow-lg ">
                            <MicropostDelete id={data.id} />
                          </div>
                        )}
                      </div>
                    </>
                  )} 
                </div>
              </div>   
              <div className="ml-12 pb-3">
                <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {data.content}</p>
              </div>
              <div className="ml-12">
                <PagesMicropostLike post={data} />
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <CommentForm post={data} id={data.comment?.id} />
            </div>
            <div className="">
              <CommentList id={id} post={data} post_id={data.comment?.post_id}/>
            </div>
          </div>
        </div>
      )}
    </Layout>  
  )
}

export default MicropostPage
