import { get } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Box from '../Ui/Box'
import Text from '../Ui/Text'
import BaseAttachment from './BaseAttachment'
import BasePostContent from './BasePostContent'
import UserLine from './UserLine'

function renderAttachments(attachments) {
  return Object.keys(attachments).map(key => {
    const currentAttachment = attachments[key]

    return(
        <Box key={key} marginTop={10}>
          <BaseAttachment attachment={currentAttachment} />
        </Box>
    )
  })
}

const PostActivity = props => {
  const { activity } = props
  const { activity: { actor, object, time } } = props

  const { name, profileImage } = actor.data

  return (
      <Box display="flex" direction="column" marginBottom={30}>
        <Box marginBottom={15}>
          <Link to={`/users/${actor.id}`}>
            <UserLine username={name} image={profileImage} imageShape="circle" />
          </Link>
          <Box marginTop={4}>
            <Text color="grayBlue" fontSize="sm">{moment(time).format('Do MMMM [at] H:mm')}</Text>
          </Box>
        </Box>
        <Box>
          <BasePostContent content={object} />
        </Box>
        <Box>
          {renderAttachments(get(activity, 'attachments', {}))}
        </Box>
      </Box>
  )
}

PostActivity.propTypes = {
  activity: PropTypes.object.isRequired,
}

export default PostActivity
