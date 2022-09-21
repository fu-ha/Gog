import { atom, selector } from "recoil"

type PostLikeType = {
  id: number,
  user_id: number,
  post_id: number,
  post_liked: boolean
}

export const FeedLikeAtom = atom<PostLikeType[]>({
  key: 'FeedLikeAtom',
  default: []
})

/*export const FeedLikeAtom = atom<boolean>({
  key: 'FeedLikeAtom',
  default: false
})*/

export const CountLikeAtom = atom<number>({
  key: 'CountLikeAtom',
  default: 0
})

/*export const FeedLikeSelector = selector({
  key: 'FeedLikeSelector',
  get: ({ get }) => {
    const FeedLike = get(FeedLikeAtom)
    const FeedLikeNum = FeedLike.length
    return FeedLikeNum
  },
})*/