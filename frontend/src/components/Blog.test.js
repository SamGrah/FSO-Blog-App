import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is donw with react-testing-library', 
    author: 'test runner',
    url: 'https://jest-testing.com' 
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is donw with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'test runner'
  )
  
  expect(component.container).not.toHaveTextContent(
    'https://jest-testing.com'
  )
})