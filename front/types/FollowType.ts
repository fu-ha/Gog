export type FollowType = {
  id: number,
  name: string,
  image_url: string
}

export type RelationshipsType = {
  relationships: {
    following: FollowType[],
    followers: FollowType[]
  },
  following_index: number[],
  followers_index: number[]
}
