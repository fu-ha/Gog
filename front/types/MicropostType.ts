export type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  updated_at?: string,
  name?: string,
  image_url?: string
}

export type MicropostValueType = {
  post: MicropostType
}

export type MicropostFormValue = {
  content: string,
  user_id: string
}
