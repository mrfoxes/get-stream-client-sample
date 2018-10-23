import React from 'react'
import get from 'lodash/get'
import merge from 'lodash/merge'

function cleanProps(props, ...keys) {
  const newProps = Object.create(props)

  keys.forEach(key => delete newProps[key])
}

function hasData(data) {
  const length = data.length
  return length > 0
}

function getMergedActions(context, props) {
  const propsActions = get(props, 'actions')
  const contextActions = get(context, 'actions')

  return merge(propsActions, contextActions)
}

function createConsumerContext(Consumer) {
  return () => Comp => props => {
    return (
        <Consumer>
          {context => <Comp {...context} {...props} actions={getMergedActions(context, props)} />}
        </Consumer>
    )
  }
}

function convertContentToArray(text) {
  return text.split(' ')
}

export {
  cleanProps,
  hasData,
  createConsumerContext,
  convertContentToArray,
}
