import { atom } from "recoil"

type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  name: string,
  image_url?: string
}

export type FeedContentType = {
  microposts: MicropostType[] 
}

export const FeedContentAtom = atom<FeedContentType | null>({
  key: 'FeedContentAtom',
  default: null
})