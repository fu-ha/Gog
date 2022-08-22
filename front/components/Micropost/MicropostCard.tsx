//import { useMemo } from "react"
import Image from "next/image"
//import { useForm } from "react-hook-form"
//import { useUserSWR } from "hooks/useUserSWR"
import TimeAgo from "react-timeago"
import { MicropostType } from "types/MicropostType"

type MicropostCardProps = {
  name: string,
  post: MicropostType
}

const MicropostCard = ({ name, post }: MicropostCardProps) => {
  
  return(
    <div className="max-w px-8 py-5 mx-auto bg-white rounded-sm shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <div className="rounded-circle h-16 w-16">
            {/*<Image 
              src={post.image_url || ""}
              width={16}
              height={16}
              className="rounded-full"
              alt="usericon"
            />*/}
          </div>
          <a className="text-sm font-bold text-gray-700 cursor-pointer dark:text-gray-200">ユーザー名: {name}</a>
          <p className="text-xs text-gray-700 dark:text-gray-200">
            <TimeAgo date={new Date(post.created_at)}></TimeAgo>
          </p>
        </div>
      </div>
      <div className="mt-2">
        <a href="#" className="text-base font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"></a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">投稿内容: {post.content}</p>
      </div>
    </div>        
  )
}

export default MicropostCard
