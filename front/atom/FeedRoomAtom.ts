import { atom } from "recoil"

export type RoomDataType = {
  room: {
    id: number
  },
  other_user: {
    id: number,
    name: string
  },
  last_message: {
    content: string,
    created_at: string
  },
  entry: {
    
  }
}

export const FeedRoomAtom = atom<RoomDataType[]>({
  key: 'FeedRoomAtom',
  default: []
})