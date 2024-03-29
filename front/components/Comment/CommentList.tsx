import { useEffect } from "react"
import Link from "next/link"
import { useRecoilState } from "recoil"
import { FeedCommentAtom } from "atom/FeedCommentAtom"
import { MicropostType } from "types/MicropostType"
import { CommentLike } from "components/Comment/CommentLike"
// import { CommentDelete } from "components/Comment/CommentDelete"
/*
　map関数でコメント削除のモーダル表示をuseStateで管理してたが、このコンポーネントで{data.post_id == id}内に書いていたので
　全モーダルの動き（状態）が共通化してしまった為、コンポーネントを分けてstateを振り分けた。
　※ 「CommentDelete」は「CommentDeleteCmp」に挿入している。
*/
import { CommentDeleteCmp } from "components/Comment/CommentDeleteCmp"
import axios from "axios"
import Cookies from "js-cookie"
import moment from "moment"
import "moment/locale/ja"
// import { MdMoreHoriz } from "react-icons/md"

type CommentProps = {
  id: number,
  post_id: number
  post: MicropostType,
}

// type CurrentUserData = {
//   login_user: {
//     id: number
//   }
// }

export const CommentList = ({ id, post }: CommentProps) => {
  const comment_url = process.env.NEXT_PUBLIC_BASE_URL + `posts/${post.id}/comments`
  
  const [FeedComment, setFeedComment] = useRecoilState(FeedCommentAtom)
  // const [isOpen, setIsOpen] = useState(false)
  
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
      .then((data) => {
        console.log(data)
      })
  }, [])
  
  // const login_user = process.env.NEXT_PUBLIC_BASE_URL + "users"
  // const [currentUser, setCurrentUser] = useState<CurrentUserData>()
  
  // useEffect(() => {
  //   axios(login_user, {
  //     headers: {
  //       "access-token": Cookies.get("access-token") || "",
  //       "client": Cookies.get("client") || "",
  //       "uid": Cookies.get("uid") || "",
  //     }
  //   })
  //     .then((res) => {
  //       setCurrentUser(res.data[0])  
  //     })
  // }, [])
  
  return(
    <>
      {FeedComment && FeedComment.map((data) => (
        <>
          {data.post_id == id && (
            <li 
              className="list-none" 
              key={data.id}
              id={`comment-${data.id}`}
        　　　>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="max-w px-5 py-3 mx-auto">
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
                    <div className="flex">
                      <p className="ml-2 mt-1 text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                        {data.user?.name}
                      </p>
                      <p className="ml-2 mt-1.5 flex flex-col text-xs text-gray-500 dark:text-gray-400">
                        {moment(data.created_at).fromNow()} 
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block">
                    <CommentDeleteCmp post={post} />
                    {/*currentUser?.login_user.id == data.user_id && (
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
                              <CommentDelete id={data.id} post={post} />
                            </div>
                          )}
                        </div>
                      </>
                    )*/} 
                  </div>
                </div>   
                <div className="ml-12 mb-2 md:mb-5">
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{data.content}</p>
                </div>
                <div className="ml-12">
                  <CommentLike post={post} comment={data} />
                </div>
              </div>
            </li>
          )}
        </>
      ))}
    </>
  )
}