import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import style from './Text.module.css'
import { Colors } from './colors'

const weightCs = {
  normal: style.normal,
  bold: style.bold,
}

const fontSizeCs = {
  sm: style.fontSizeSm,
  md: style.fontSizeMd,
  normal: style.fontSizeNormal,
  lg: style.fontSizeLg,
}

const Text = (props) => {
  const {
    children,
    color,
    inline,
    weight,
    fontSize,
  } = props

  const classNames = classnames(
      weightCs[weight],
      Colors[color],
      inline ? style.inline : '',
      fontSizeCs[fontSize],
  )

  return <span className={classNames}>{children}</span>
}

Text.propTypes = {
  color: PropTypes.oneOf(['jet', 'flame', 'vividGambodge', 'spanishBlue', 'black', 'white', 'transparent', 'grayBlue']),
  weight: PropTypes.oneOf(['normal', 'bold']),
  inline: PropTypes.bool,
  fontSize: PropTypes.oneOf(['sm', 'md', 'normal', 'lg']),
}

Text.defaultProps = {
  color: 'black',
  weight: 'normal',
  inline: false,
  size: 'normal',
}

export default Text
