import useSWR from 'swr'
import { MicropostType } from 'types/MicropostType'

export const User_Url = process.env.NEXT_PUBLIC_BASE_URL + 'users'

type UserDataType = {
  user: { id: number, uid: string, provider: string, name: string, email: string, image_url: string, activated: boolean, activated_at: string, posts: MicropostType[] }
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