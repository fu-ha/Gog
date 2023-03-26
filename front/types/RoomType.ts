export type RoomDataType = {
  room: {
    id: number
  },
  other_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  },
  last_message: {
    content: string,
    created_at: string
  },
  login_user: {
    id: number,
    name: string,
    image?: {
      url: string,
    },
  },
  entry: {
  }
}

export type MessageValueType = {
  content: string
}