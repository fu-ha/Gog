export type CommentType = {
  id: number,
  content: string,
  user_id: number,
  post_id: number,
  created_at: string,
  updated_at?: string,
  user: {
    id: number,
    name: string,
    email: string,
  },
  //image_url?: string
  image?: {
    url: string,
  } 
}

export type CommentFormValue = {
  user_id: number,
  post_id: number,
  content: string,
  //image: string
}
