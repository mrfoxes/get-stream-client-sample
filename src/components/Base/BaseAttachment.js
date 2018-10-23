import { get, truncate } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { hasData } from '../../utils/utils'
import Box from '../Ui/Box'
import Text from '../Ui/Text'

// TODO: expand to carousel
function renderImages(images) {
  if (hasData(images)) {
    const image = images[0]

    return <img width="100%" src={image.image} alt="" />
  }

  return null
}

const BaseAttachment = props => {
  const { attachment } = props

  return (
      <Box width={200} bordered padding={10}>
        <a href={attachment.url} target="_blank" rel="noreferrer noopener">
        <Box marginBottom={5}>
          <Text color="spanishBlue">
          <span
              dangerouslySetInnerHTML={{ __html: truncate(attachment.title, 100) }}
          />
          </Text>
        </Box>
        {renderImages(get(attachment, 'images'))}
        <Box>
          <Text fontSize="sm" color="jet">
            <span
                dangerouslySetInnerHTML={{ __html: attachment.description }}
            />
          </Text>
        </Box>
        </a>
      </Box>
  )
}

BaseAttachment.propTypes = {
  attachment: PropTypes.object.isRequired,
}

export default BaseAttachment
