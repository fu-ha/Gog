import useSWR from 'swr';
import { PostType } from 'types/PostType'

export const LoginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}login`;

type UserDataType = {
  user: { id: number, uid: string, provider: string, name: string, email: string, image_url: string, activated: boolean, activated_at: string, posts: PostType[] }
}

type useUserType = {
  user_data: UserDataType | null | undefined,
  user_error: string | null,
}

export function useUserSWR(): useUserType {
  const { data: user_data, error: user_error } = useSWR(LoginUrl,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return { user_data, user_error }
}