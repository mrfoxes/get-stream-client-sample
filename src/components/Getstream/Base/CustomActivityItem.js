import React from 'react'
import PropTypes from 'prop-types'

const CustomActivityItem = (props) => {
  const { activity } = props

  return (
      <div>
        {JSON.stringify(activity, null, 4)}
      </div>
  )
}

CustomActivityItem.propTypes = {
  activity: PropTypes.object,
}

CustomActivityItem.defaultProps = {
  activity: {},
}

export default CustomActivityItem
