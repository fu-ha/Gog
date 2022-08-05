import { atom } from "recoil"

type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  name: string,
  image_url?: string
}

//FeedContentAtomでMicropostTypeをそのまま使ってpages/index.tsxで、
//FeedContent.map((post) => ( <></>))としてもよき
export type FeedContentType = {
  posts: MicropostType[] 
}

export const FeedContentAtom = atom<FeedContentType | null>({
  key: 'FeedContentAtom',
  default: null
})