import React from 'react'
import ActivitySwitchRenderer from '../Getstream/Components/ActivitySwitchRendere'
import PostActivity from './PostActivity'
import ReplyActivity from './ReplyActivity'

const MultiFeedRenderer = ({ activity, ...props }) => {
  return (
      <ActivitySwitchRenderer
          activity={activity}
          verbs={{
            post: PostActivity,
            reply: ReplyActivity,
          }}
          {...props}
      />
  )
}

export default MultiFeedRenderer
