import useSWR from 'swr'
import { MicropostType } from 'types/MicropostType'

export const User_Url = process.env.NEXT_PUBLIC_BASE_URL + 'users'

type UserDataType = {
  user: { id: number, name: string, email: string, activated: boolean, image_url: string, posts: MicropostType[] }
}

type useUserType = {
  user_data: UserDataType | null | undefined,
  user_error: string | null,
}

export function useUserSWR(): useUserType {
  const { data: user_data, error: user_error } = useSWR(User_Url,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })
  return { user_data, user_error }
}