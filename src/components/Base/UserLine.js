import React from 'react'
import Avatar from '../Ui/Avatar'
import Box from '../Ui/Box'
import Text from '../Ui/Text'
import PropTypes from 'prop-types'

const UserLine = ({ username, image, imageShape, avatar, color }) => {
  return (
      <Box display="flex" direction="row">
        {avatar && (
            <Box marginRight={5}>
              <Avatar size={25} shape={imageShape} image={image} />
            </Box>
        )}
        <Box display="flex" align="center">
          <Text color={color} weight="bold">{username}</Text>
        </Box>
      </Box>
  )
}

UserLine.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageShape: PropTypes.oneOf(['circle', 'square']),
  color: PropTypes.oneOf(['jet', 'flame', 'vividGambodge', 'spanishBlue', 'black', 'white', 'transparent', 'grayBlue']),
  avatar: PropTypes.bool,
}

UserLine.defaultProps = {
  imageShape: 'square',
  avatar: true,
  color: 'black',
}

export default UserLine
