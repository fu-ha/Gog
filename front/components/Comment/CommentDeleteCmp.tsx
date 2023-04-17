import { useState, useEffect } from "react"
import axios from "axios" 
import Cookies from "js-cookie"
import { useFlashMessage } from "hooks/useFlashMessage"
import { useReloadComment } from "hooks/useReloadComment"
import { MdDelete } from "react-icons/md"
import { MicropostType } from "types/MicropostType"
import { CommentDelete } from "components/Comment/CommentDelete"
import { MdMoreHoriz } from "react-icons/md"

type CommentDeleteCmpProps = {
  post: MicropostType
}

type CurrentUserData = {
  login_user: {
    id: number
  }
}

export const CommentDeleteCmp = ({ post }: CommentDeleteCmpProps) => {
  
  const login_user = process.env.NEXT_PUBLIC_BASE_URL + "users"
  const [currentUser, setCurrentUser] = useState<CurrentUserData>()
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    axios(login_user, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setCurrentUser(res.data[0])  
      })
  }, [])
  
  return(
    <>
      {currentUser?.login_user.id == post.comment?.user_id && (
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
                <CommentDelete id={post.comment.id} post={post} />
              </div>
            )}
          </div>
        </>
      )} 
    </>
  )
}