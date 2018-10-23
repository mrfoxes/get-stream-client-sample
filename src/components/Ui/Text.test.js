import React from 'react'
import renderer from 'react-test-renderer'
import Text from './Text'

it('renders correctly', () => {
  const tree = renderer
      .create(<Text color="flame">GetStream</Text>)
      .toJSON()
  expect(tree).toMatchSnapshot()
})
