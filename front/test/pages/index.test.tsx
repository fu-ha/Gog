import Index from "@/pages/index"
import { render, screen, waitFor } from "../test-utils"
  
describe("Index", () => {
  //importするファイル名は小文字でもいいが、関数名は大文字じゃないとエラー。
  // render(<Index />)
  
  // render(<Index />)
  // expect(screen.getByText('投稿するにはログイン・新規登録、またはゲストログインしてください。')).toBeTruthy()
  
  beforeEach(async () => {
    await waitFor(() => render(<Index />))
  })
  // beforeEach(() => {
  //   waitFor(() => render(<Index />))
  // })
  
  describe("logout", () => {
    test("ログアウト時のテキスト表示", () => {
      // expect(screen.getByRole('投稿するにはログイン・新規登録、またはゲストログインしてください。')).toBeInTheDocument()
      expect(screen.getByText('投稿するにはログイン・新規登録、またはゲストログインしてください。')).toBeTruthy()
    })
  })
  
  // describe("login", () => {
  //   test("ログイン時", () => {
      
  //   })
  // })
})