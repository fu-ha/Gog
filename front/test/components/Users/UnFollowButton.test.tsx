import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
// import { getPage } from 'next-page-tester'
import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { UnFollowButton } from "../../../components/Users/UnFollowButton"
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

describe('UnFollowButton', () => {
  const props = { relationship: { id: 1, user_id: 1, follow_id: 2 }}
  
  beforeEach(async () => {
    await waitFor(() => render(<UnFollowButton relationship={props.relationship} />))
  })
  
  it('フォロー解除成功', () => {
    userEvent.click(screen.getByTestId('unfollow-button'))
    console.log(props.relationship)
  })
  
  it('フォロー解除失敗', () => {
    rest.post(`process.env.NEXT_PUBLIC_BASE_URLusers/${props.relationship.user_id}/relationships/${props.relationship.id}`, 
      (req, res, ctx) => {
        res(ctx.status(404))
      }
    )
    userEvent.click(screen.getByTestId('unfollow-button'))
  })
})