import React from 'react'
import PropTypes from 'prop-types'
import { cleanProps } from '../../utils/utils'
import icons from './Icons'

const Icon = ({ icon, ...props }) => {
  return React.createElement(icons[icon], cleanProps(props, 'icon'))
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default Icon
