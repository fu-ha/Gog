import Link from "next/link"
import { MicropostType } from "types/MicropostType"
import { MdChatBubble } from "react-icons/md"

type MicropostCommentType = {
  post: MicropostType
}

export const MicropostComments = ({ post }: MicropostCommentType) => {
  
  return(
    <Link href={`/microposts/${post.id}`}>
      <div className="mr-3 flex">
        <MdChatBubble className="md:text-xl text-gray-300 dark:text-gray-500" />
        <div className="ml-1">{post.comment_count}</div>
      </div>
    </Link>
  )
}
