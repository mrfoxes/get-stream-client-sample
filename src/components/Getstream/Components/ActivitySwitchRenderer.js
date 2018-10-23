import { get } from 'lodash'
import PropTypes from 'prop-types'
import { safeRender } from '../utils'

const ActivitySwitchRenderer = props => {
  const { activity: { verb }, verbs } = props

  const component = get(verbs, verb, null)

  return safeRender(component, props)
}

ActivitySwitchRenderer.propTypes = {
  verbs: PropTypes.object,
  activity: PropTypes.object.isRequired,
}

export default ActivitySwitchRenderer
