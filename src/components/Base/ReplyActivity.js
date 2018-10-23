import moment from 'moment'
import React from 'react'
import Verbs from '../../config/verbs'
import Box from '../Ui/Box'
import Icon from '../Ui/Icon'
import Text from '../Ui/Text'
import UserLine from './UserLine'

const ReplyActivity = props => {
  const { actor: { id }, object, time } = props.activity
  return (
      <Box maxWidth={200}>
        <Box display="flex" height={10} align="center">
          <Box display="inlineBlock">
            <Box display="inlineBlock" marginRight={5}><Icon icon="comment" /></Box>
            <UserLine username={id} avatar={false}/>
            <Text fontSize="sm" color="grayBlue">{Verbs.COMMENT_PAST} with &nbsp;</Text><Text>"{object}"&nbsp;</Text>
            <br />
            <Text color="grayBlue" fontSize="sm">{moment(time).startOf('day').fromNow()}</Text>
          </Box>
        </Box>
      </Box>
  )
}

export default ReplyActivity
