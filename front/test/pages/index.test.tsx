import Index from "@/pages/index"
import { render, screen, waitFor } from "../test-utils"
// import { rest } from "msw"
// import { MicropostForm } from "@/components/Micropost/MicropostForm"
import axios from "axios"

jest.mock('axios')  
const axiosMock = jest.mocked(axios)

describe("index", () => {
  
  beforeEach(async () => {
    axiosMock.mockResolvedValue({ data: [{ id: 1, user_id: 1, content: "content-1" }, {id: 2, user_id: 1, content: "content-2" }] })
    await waitFor(() => render(<Index />))
    // await waitFor(() => render(<MicropostForm />))
  })
  
  it("ログアウト時のテキスト表示", () => {
    expect(screen.getByText('投稿するにはログイン・新規登録、またはゲストログインしてください。'))
  })
  
  it("ログイン時", async () => {
    // expect(await screen.getByPlaceholderText('投稿内容を書く'))
  })
})