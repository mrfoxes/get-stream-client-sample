import React from 'react'
import Box from '../../Ui/Box'
import Text from '../../Ui/Text'

const EmptyFeedList = () => {
  return (
      <Box display="flex" padding={25} justify="center">
        <Text color="jet">
          No news on your feed...
        </Text>
      </Box>
  )
}

export default EmptyFeedList
