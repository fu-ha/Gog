import { atom, selector } from "recoil"

export type MessageDataType = {
  id: number,
  user_id: number,
  room_id: number,
  content: string,
  created_at: string
}

export const FeedMessageAtom = atom<MessageDataType[]>({
  key: 'FeedMessageAtom',
  default: []
})

export const MessageReloadSelector = selector({
  key: 'MessageReloadSelector',
  get: async () => {
    const reload_url = `${process.env.NEXT_PUBLIC_BASE_URL}messages`
    return reload_url 
  }
})