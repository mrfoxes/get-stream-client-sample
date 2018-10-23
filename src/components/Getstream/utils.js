import React from 'react'

function safeRender(component, props = {}) {
  if (component === null) {
    return null
  }

  if (typeof (component) === 'function') {
    return React.createElement(component, props)
  }

  return component
}

export {
  safeRender,
}
