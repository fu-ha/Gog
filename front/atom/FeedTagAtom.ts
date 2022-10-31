import { atom } from "recoil"

export type MicropostTag = {
  id: number,
  name: string,
  created_at: string,
}

export const FeedTagAtom = atom<MicropostTag[]>({
   key: 'FeedTagAtom',
   default: []
})