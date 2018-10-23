import React from 'react'
import Box from '../Ui/Box'
import Text from '../Ui/Text'

const MeEmptyFeed = () => {
  return (
      <Box display="flex" padding={25} justify="center" direction="column">
        <Box display="flex" justify="center">
          <Text color="grayBlue">
            Your feed it's empty.
          </Text>
        </Box>
        <Box display="flex" justify="center">
          <Text color="grayBlue">
            Start posting now!
          </Text>
        </Box>
      </Box>
  )
}

export default MeEmptyFeed
