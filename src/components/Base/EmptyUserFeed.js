import React from 'react'
import Box from '../Ui/Box'
import Text from '../Ui/Text'

const EmptyUserFeed = () => {
  return (
      <Box display="flex" padding={25} justify="center">
        <Text color="jet">
          User haven't posted yet
        </Text>
      </Box>
  )
}

export default EmptyUserFeed
