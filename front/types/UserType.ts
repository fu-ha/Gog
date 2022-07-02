//新規登録
export type UserValueType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

//export type UserEditType = {
 // name?: string,
//  email?: string,
 // password?: string,
//  password_confirmation?: string,
//}

//ログイン
export type LoginValueType = {
  email: string,
  password: string,
}

//新規登録とログインの成功時の型
type UserSuccessType = {
  id: number,
  uid: string,
  provider: string,
  name: string,
  email: string,
  image_url?: string,
  allowPasswordChange: boolean,
  created_at: Date,
  updated_at: Date
}

//新規登録の失敗時の型
export type UserSignupErrorType = {
  errors: {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
  }
}
//ログインの失敗時の型
type UserLoginErrorType = {
  error: "Invalid username or password"
}
//新規登録時のSuccessとErrorのunion型
export type UserSignupType = UserSuccessType | UserSignupErrorType
//ログイン時のSuccessとErrorのunion型
export type UserLoginType = UserSuccessType | UserLoginErrorType

// posts/likedの型
export type UserLikedPostType = {
  id: number,
  name: string,
  email: string,
  //gravator_url: string,
}

export type UserLikedCommentType = {
  id: number,
  name: string,
  email: string,
}