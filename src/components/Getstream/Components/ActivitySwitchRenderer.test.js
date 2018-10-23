import React from 'react'
import renderer from 'react-test-renderer'
import PostActivity from '../../Base/PostActivity'
import BaseActivityItem from '../Base/BaseActivityItem'
import CustomActivityItem from '../Base/CustomActivityItem'
import ActivitySwitchRenderer from './ActivitySwitchRenderer'
import { MemoryRouter } from 'react-router-dom'

const activity = {
  'actor': {
    'id': 'purpletiger922',
    'collection': 'user',
    'data': {
      'name': 'Benjamin hansen',
      'profileImage': 'https://randomuser.me/api/portraits/med/men/97.jpg',
    },
    'created_at': '2018-10-18T12:30:17.759825Z',
    'updated_at': '2018-10-18T12:30:17.759825Z',
  },
  'foreign_id': '',
  'id': '9245acb5-d2d1-11e8-a18f-0a544dd61b80',
  'object': '@beautifulpanda108 let\'s get coffee one these days ☕',
  'origin': 'user:purpletiger922',
  'target': '',
  'time': '2018-10-18T12:30:17.883769',
  'verb': 'post',
}

it('renders correctly', () => {
  const tree = renderer
      .create(
          <MemoryRouter>
            <ActivitySwitchRenderer
                activity={activity}
                verbs={{
                  post: PostActivity,
                  reply: CustomActivityItem,
                }}
            />
          </MemoryRouter>,
      )
      .toJSON()
  expect(tree).toMatchSnapshot()
})
