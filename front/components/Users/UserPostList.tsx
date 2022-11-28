import { useState, useEffect } from "react" 
import axios from "axios"
import Cookies from "js-cookie"
import moment from "moment"
import "moment/locale/ja"
import { MdMoreHoriz } from "react-icons/md"
import { useRecoilState } from "recoil"
import { FeedContentAtom } from "atom/FeedContentAtom"
import { PagesUserLike } from "components/PagesUserLike"
import { MicropostLike } from "components/Micropost/MicropostLike"
import { MicropostDelete } from "components/Micropost/MicropostDelete"

type UserPostListProps = {
  id?: number,
  profileData?: {
    login_user: {
      id: number
    }
  }
}

export const UserPostList = ({ id, profileData }: UserPostListProps) => {
  const profile_post_url = process.env.NEXT_PUBLIC_BASE_URL + "posts"
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    axios(profile_post_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setFeedContent(res.data)
      })
  }, [])
  
  return(
    <>
      {FeedContent && FeedContent.map((data) => (
        <>
          {data.user_id == id && (
            <li className="list-none">
              <div className="inset-0 px-4 sm:px-6 lg:px-10">
                <div className="space-y-5 z-0 rounded-sm border-x-2 border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="max-w px-2 md:px-5 py-2 md:py-4 mx-auto">
                    <div className="flex">
                      <div className="flex-1 flex">
                  {//<Link /*href="/users/[id]" as*/ href={`/users/${id}`}>
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
                  //</Link>
                  }
                        <div className="flex flex-col">
                          <p>UserId: {data.user_id}</p>
                          <p>PostId: {data.id}</p>
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
                        {profileData?.login_user.id == data.user_id && (
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
                      {/*<MicropostLike post={data} />*/}
                      <PagesUserLike post={data} />
                    </div>
                  </div>
                </div>
              </div>  
            </li>
          )}
        </>
      ))}
    </>
  )
}
