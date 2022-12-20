import { atom } from "recoil"

export type RoomDataType = {
  room: {
    id: number,
    created_at: string,
  },
  other_user: {
    id: number,
    name: string,
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
  }
}

export const FeedRoomAtom = atom<RoomDataType[]>({
  key: 'FeedRoomAtom',
  default: []
})