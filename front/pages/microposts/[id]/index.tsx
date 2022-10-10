import { useState, useEffect } from "react"
//import useSWR from "swr"
import { useRouter } from "next/router"
//import { useRecoilState } from "recoil"
//import { FeedContentAtom } from "atom/FeedContentAtom"
//import { FeedCommentAtom } from "atom/FeedCommentAtom"
import { MicropostDelete } from "components/Micropost/MicropostDelete"
import { CommentForm } from "components/Comment/CommentForm"
import { CommentList } from "components/Comment/CommentList"
import axios from "axios"
import Cookies from "js-cookie"
import Layout from "components/Layout"
import moment from "moment"
import "moment/locale/ja"
import { MdMoreVert } from "react-icons/md"

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
  user: {
    id: number,
    name: string
  },
  comment: {
    id: number,
    user_id: number,
    content: string,
    created_at: string
  }
}

type CommentDataType = {
  id: number,
  user_id: number, 
  post_id: number,
  content: string,
  created_at: string,
  //user: {
  //  id: number,
  //  name: string
  //}
  //post: {
  //  id: number,
  //  user_id: number,
  //  content: string,
  //  created_at: string
  //}
}

const MicropostPage = () => {
  //const [FeedComment, setFeedComment] = useRecoilState(FeedCommentAtom)
  //const [FeedContet, setFeedContent] = useRecoilState(FeedContentAtom)
  const [currentUser, setCurentUser] = useState<CurrentUserData>()
  const [commentData, setCommentData] = useState<CommentDataType>()
  //const [data, setData] = useState<CommentDataType>()
  const [data, setData] = useState<PostShowData>(/*{
    id: 0,
    user_id: 0,
    content: "",
    created_at: "",
    user: {
      id: 0,
      name: ""
    }
  }*/)

  const [isOpen, setIsOpen] = useState(false)
  
  const router = useRouter()
  const { id } = router.query
  
  const post_show_url = process.env.NEXT_PUBLIC_BASE_URL + 'posts/' + id
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + "comments"
  
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
      .then((response) => {
        setData(response.data)
        axios(comment_url, {
          headers: {
            "access-token": Cookies.get("access-token") || "",
            "client": Cookies.get("client") || "",
            "uid": Cookies.get("uid") || "",
          }
        })
          .then((res) => {
            setCommentData(res.data)  
          })
      })
  }, [id])
  
  /*
  
  useEffect(() => {
    if (id === undefined) {
      return
    }
    axios(comment_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setCommentData(res.data)
      })
  }, [id])*/
  
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
        setCurentUser(res.data)
      })
  }, [])
  
  return(
    <Layout>
      {data && commentData &&(
        <div className="inset-0 px-4 py-6 sm:px-6 lg:px-10">
          <div className="space-y-5 z-0 rounded-sm bg-white dark:bg-gray-800">
            <div className="max-w px-5 pt-4 mx-auto">
              <div className="flex">
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
                    <p>UserId: {data.user_id}/ {currentUser?.login_user?.id}</p>
                    <p>PostId: {data.id}</p>
                  </div>
                  <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                    名前： {data.user.name}
                  </p>
                  <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-700 dark:text-gray-200">
                    {moment(data.created_at).fromNow()} 
                  </p>
                </div>
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-lg rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <MdMoreVert />
                  </button>
                  <div>
                    {currentUser?.login_user?.id == data.user_id && (
                      <>
                        {isOpen && (
                          <div className="absolute z-10 right-0 w-40 shadow-lg ">
                            <MicropostDelete id={data.id} />
                          </div>
                        )}
                      </>
                    )} 
                  </div>
                </div>
              </div>   
              <div className="ml-12 pb-3">
                <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {data.content}</p>
              </div>
              <hr className="my-1 border-gray-200 dark:border-gray-600" />
              <CommentForm />
            </div>
            <hr className="border-gray-200 dark:border-gray-600" />
            <div className="">
              <CommentList id={commentData.id} post_id={commentData.post_id} post={data} />
            </div>
          </div>
        </div>
      )}
    </Layout>  
  )
}

export default MicropostPage