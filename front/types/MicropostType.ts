export type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  updated_at?: string,
  user: {
    id: number,
    name: string,
    email: string,
    //image: string,
  },
  //image_url?: string
  image?: {
    url: string,
  } ,
  liked_count: number
}

/*export type MicropostValueType = {
  posts: MicropostType
}*/

export type MicropostFormValue = {
  content: string,
  image: string
}
