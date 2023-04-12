import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
// import { getPage } from 'next-page-tester'
import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { FollowButton } from "../../../components/Users/FollowButton"
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

describe('FollowButton', () => {
  const props = { user_id: 1, follow_id: 2 }
  
  beforeEach(async () => {
    await waitFor(() => render(<FollowButton user_id={props.user_id} follow_id={props.follow_id} />))
  })
  
  it('フォロー成功', () => {
    userEvent.click(screen.getByTestId('follow-button'))
    console.log(props)
  })
  
  it('フォロー失敗', () => {
    rest.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${props.user_id}/relationships`, 
      (req, res, ctx) => {
        res(ctx.status(404))
      }
    )
    userEvent.click(screen.getByTestId('follow-button'))
  })
})