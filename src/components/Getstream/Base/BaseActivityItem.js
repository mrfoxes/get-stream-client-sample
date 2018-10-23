import React from 'react'
import PropTypes from 'prop-types'

const BaseActivityItem = (props) => {
  const { activity } = props

  return (
      <div>
        {JSON.stringify(activity, null, 4)}
      </div>
  )
}

BaseActivityItem.propTypes = {
  activity: PropTypes.object,
}

BaseActivityItem.defaultProps = {
  activity: {},
}

export default BaseActivityItem
