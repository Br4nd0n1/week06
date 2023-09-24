import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('Checks For American And British General Headings', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', {
      name: /American Generals/i,
    })

    const heading2 = screen.getByRole('heading', {
      name: /British Generals/i,
    })

    expect(heading).toBeInTheDocument()
    expect(heading2).toBeInTheDocument()
  })
})