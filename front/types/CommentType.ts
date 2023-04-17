export type CommentType = {
  // user: {
  //   id: number,
  //   name: string,
  //   email: string,
  // },
  // comments: {
    id: number,
    user_id: number,
    post_id: number,
    content: string,
    created_at: string,
    updated_at?: string,
    comment_liked_count: number,
  // }
}

export type CommentFormValue = {
  //user_id: number,
  post_id: number,
  content: string,
  //image: string
}
