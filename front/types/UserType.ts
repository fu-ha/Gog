//新規登録
export type UserValueType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

//ログイン
export type LoginValueType = {
  email: string,
  password: string,
}