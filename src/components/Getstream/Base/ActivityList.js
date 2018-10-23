import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { hasData } from '../../../utils/utils'

const ActivityList = (props) => {
  const {
    feeds,
    children,
  } = props

  if (!hasData(feeds)) {
    return null
  }

  return (
      feeds.map((activity, index) => {
        return (
            <Fragment key={activity.id}>
              {React.cloneElement(children, { activity })}
            </Fragment>
        )
      })
  )
}

ActivityList.propTypes = {
  feeds: PropTypes.array.isRequired,
}

export default ActivityList
