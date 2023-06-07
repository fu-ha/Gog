import { render, screen, waitFor } from "../../test-utils"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
// import { getPage } from 'next-page-tester'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import SignupModal from "@/components/Auth/SignupModal"
// import { initTestHelpers } from 'next-page-tester'

// initTestHelpers()

describe("SignupModal", () => {
  beforeEach(async () => {
    await waitFor(() => render(<SignupModal />))
  })
  
  it("新規登録に成功", async () => {
    userEvent.click(screen.getByText('新規登録'))
    
    expect(await screen.findByText('アカウント登録'))
    userEvent.type(screen.getByPlaceholderText('nickname'), 'nickname')
    userEvent.type(screen.getByPlaceholderText('email@example.com'), 'email@example.com')
    userEvent.type(screen.getByPlaceholderText('password'), 'passwd')
    userEvent.type(screen.getByPlaceholderText('password_confirmation'), 'passwd')
    userEvent.click(screen.getByText('登録'))
    
    expect(screen.findByText('新規登録に成功'))
  })
  
  it("新規登録に失敗", async () => {
    userEvent.click(screen.getByText('新規登録'))
    
    expect(await screen.findByText('アカウント登録'))
    userEvent.type(screen.getByPlaceholderText('nickname'), '')
    userEvent.type(screen.getByPlaceholderText('email@example.com'), 'email')
    userEvent.type(screen.getByPlaceholderText('password'), 'passwd')
    userEvent.type(screen.getByPlaceholderText('password_confirmation'), 'passw')
    userEvent.click(screen.getByText('登録'))
    
    expect(screen.findByText('新規登録に失敗'))
  })
})
