import { atom } from "recoil"

export type MicropostType = {
  id: number,
  content: string,
  user_id: number,
  created_at: string,
  user: {
    id: number,
    name: string,
    email: string,
  },
  image_url?: string
}

//export type FeedContentType = {
  //posts: MicropostType[]
//}

export const FeedContentAtom = atom<MicropostType[]>({
  key: 'FeedContentAtom',
  default: []
})

/*export const FeedContentAtom = atom<MicropostType>({
  key: 'FeedContentAtom',
  default: {
    id: 0,
    content: '',
    user_id: 0,
    created_at: '',
    name: '',
    image_url: '' 
  }
})*/