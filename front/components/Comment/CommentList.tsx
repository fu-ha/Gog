import { useState, useEffect } from "react"
import useSWR from "swr"
import { useRecoilState } from "recoil"
import { FeedCommentAtom } from "atom/FeedCommentAtom"
//import { MicropostType } from "types/MicropostType"
import axios from "axios"
import Cookies from "js-cookie"
import moment from "moment"
import "moment/locale/ja"

//props
type CommentsType = {
  id: number,
  post_id: number
  post: { 
    id: number,
    user_id: number,
    content: string,
    created_at: string,
  }
}
//swr
type PostData = {
  id: number,
  user_id: number,
  post_id: number,
  content: string,
  liked_count: number,
  user: {
    id: number
  },
  comment: {
    content: string
  }
}
//swr
type CommentData = {
  id: number, 
  user_id: number,
  post_id: number
  content: string,
  created_at: string
}

export const CommentList = ({ id, post_id, post }: CommentsType) => {
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + `comments/${post.id}`　//`posts/${post.id}/comments`
  //const show_posts = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}`
  //const show_comments = process.env.NEXT_PUBLIC_BASE_URL + `comments/${id}` //`posts/${post.id}/comments/${id}`
  /*const { data: posts_data } = useSWR<PostData>(show_posts, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  /*const { data: comments_data } = useSWR<CommentData>(show_comments, {
    revalidateIfStale: false, revalidateOnFocus: false
  })*/
  
  const [FeedComment, setFeedComment] = useRecoilState(FeedCommentAtom)
  
  useEffect(() => {
    axios(comment_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setFeedComment(res.data)
      })
  }, [])
  
  return(
      //{ posts_data?.id == comments_data?.post_id &&
    <>
      {FeedComment && FeedComment.map((comment) => (
        <div>
        <div className="max-w px-5 py-3 mx-auto">
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
                <p>UserId: {comment.user_id}</p>
                <p>CommentId: {comment.id}</p>
              </div>
              <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                名前： {comment.user?.name}
              </p>
              <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-700 dark:text-gray-200">
                {moment(comment.created_at).fromNow()} 
              </p>
            </div>
            {/*<div className="relative inline-block">
              <button
                type="button"
                //onClick={() => setIsOpen(!isOpen)}
                className="text-lg rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <MdMoreVert />
              </button>
              <div>
                {currentUser?.login_user.id == data.user_id && (
                  <>
                    {isOpen && (
                      <div className="absolute z-10 right-0 w-40 shadow-lg ">
                        <MicropostDelete id={data.id} />
                      </div>
                    )}
                  </>
                )} 
              </div>
            </div>*/}
          </div>   
          <div className="ml-12 pb-3">
            <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {comment.content}</p>
          </div>
        </div>
          <div>
            <hr className="border-gray-200 dark:border-gray-600" />
          </div>
        </div>
        ))}
    </>
  //  }
  )
}