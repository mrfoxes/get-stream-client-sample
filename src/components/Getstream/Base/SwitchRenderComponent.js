import { isUndefined } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { cleanProps } from '../../../utils/utils'
import { safeRender } from '../utils'

const SwitchRenderComponent = props => {
  const {
    component,
    fallback,
  } = props

  const cleanedProps = cleanProps(props, 'fallback', 'component')

  if (!isUndefined(component)) {
    return safeRender(component, props)
  }

  return safeRender(component, props)
}

SwitchRenderComponent.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  fallback: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]).isRequired,
}

export default SwitchRenderComponent
