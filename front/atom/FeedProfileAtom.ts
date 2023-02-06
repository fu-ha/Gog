import { atom, selector } from "recoil"
import { MicropostType } from "types/MicropostType"

export type ProfileDataType = {
  id: number,
  name: string,
  email: string,
  posts: MicropostType[],
  posts_count: number,
  relationship: {
    data: {
      id: number,
      user_id: number,
      follow_id: number,
    },
    following: number,
    follower: number,
    if_follow: {
      id: number,
      user_id: number,
      follow_id: number,
    }
  },
  login_user: {
    id: number
  }
}


export const FeedProfileAtom = atom<ProfileDataType[]>({
  key: 'FeedContentAtom',
  default: []
})

export const ProfileReloadSelector = selector({
  key: 'ProfileReloadSelector',
  get: async () => {
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}users`
    return reload_url 
  }
})
