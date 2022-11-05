export type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  updated_at?: string,
  tag?: string,
  user: {
    id: number,
    name: string,
    //email: string,
    //image: string,
  },
  //image_url?: string
  image?: {
    url: string,
  } ,
  post_liked_count: number,
  post_like: {
    id: number,
    user_id: number,
    post_id: number,
    //post_liked: boolean
  },
  //liked_icon: boolean
  post_liked: boolean,
  comment: {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: string,
  },
  comment_count: number,
  comment_like: {
    id: number,
    user_id: number,
    post_id: number,
    comment_id: number,
    created: string,
  },
  comment_liked_count: number
}

/*export type MicropostValueType = {
  posts: MicropostType
}*/

export type MicropostFormValue = {
  content: string,
  image?: {
    url: string,
  }
  //tag_id: number
}
