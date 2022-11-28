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

export type MessageValueType = {
  content: string
}