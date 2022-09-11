import useSWR from 'swr'
//import { MicropostType } from 'types/MicropostType'


type UserDataType = {
  id: number, name: string, email: string, image: string 
}

type useUserType = {
  user_data: UserDataType | null | undefined,
  user_error: string | null,
}

export function useUserSWR({id}: UserDataType): useUserType {
  const User_Url = process.env.NEXT_PUBLIC_BASE_URL + 'users' + id
  
  const { data: user_data, error: user_error } = useSWR(User_Url,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })
  return { user_data, user_error }
}