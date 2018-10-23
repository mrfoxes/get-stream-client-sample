import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { convertContentToArray } from '../../utils/utils'
import Text from '../Ui/Text'

function renderContent(content) {
  return content.map((word, index) => {
    if (word.startsWith('@')) {
      return (
          <Link key={index} to={`/users/${word.substring(1, word.length)}`}>
            <Text inline color="spanishBlue">{word}&nbsp;</Text>
          </Link>
      )
    } else if (word.startsWith('#')) {
      return <Text inline key={index} color="spanishBlue">{word}&nbsp;</Text>
    }

    return <Text inline key={index}>{word}&nbsp;</Text>
  })
}

const BasePostContent = props => {
  const { content } = props

  return (
      <Text>
        {content !== '' && renderContent(convertContentToArray(content))}
      </Text>
  )
}

BasePostContent.propTypes = {
  content: PropTypes.string.isRequired,
}

export default BasePostContent
