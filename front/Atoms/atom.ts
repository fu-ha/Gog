import { atom, selector } from "recoil"

type StatusType = {
  length: number,
  FinishLoading: boolean
}

type PostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  updated_at: string,
  name: string,
  image_url?: string
}

export type ContentType = {
  posts: PostType[]
}

export const StatusAtom = atom<StatusType>({
  key: 'StatusAtom',
  default: { length: 0, FinishLoading: false }
})

export const ContentAtom = atom<ContentType | null>({
  key: 'ContentAtom',
  default: null
})
