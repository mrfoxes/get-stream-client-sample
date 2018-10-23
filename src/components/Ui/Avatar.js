import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Box from './Box'
import Layout from './Layout.module.css'
import styles from './Avatar.module.css'

const shapeCs = {
  circle: styles.circle,
  square: styles.square,
}

const Avatar = props => {
  const {
    size,
    shape,
    image,
  } = props

  const classNames = classnames(Layout.fullWidth, shapeCs[shape])

  return (
      <Box height={size} width={size}>
        <Box className={classNames} height={size} width={size} shape={shape} color="vividGambodge">
          {image !== '' && (
              <img
                  className={classNames}
                  src={image}
                  alt=""
              />
          )}
        </Box>
      </Box>
  )
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
  shape: PropTypes.oneOf(['square', 'circle']),
}

Avatar.defaultProps = {
  image: '',
  size: 35,
  shape: 'square',
}

export default Avatar
