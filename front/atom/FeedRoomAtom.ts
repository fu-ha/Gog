import { atom, selector } from "recoil"

export type RoomDataType = {
  room: {
    id: number,
    created_at: string,
  },
  other_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  },
  last_message: {
    id: number,
    user_id: number,
    room_id: number,
    content: string,
    created_at: string,
  },
  login_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  }
}

export const FeedRoomAtom = atom<RoomDataType[]>({
  key: 'FeedRoomAtom',
  default: []
})

export const RoomReloadSelector = selector({
  key: 'RoomReloadSelector',
  get: async () => {
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}rooms`
    return reload_url 
  }
})