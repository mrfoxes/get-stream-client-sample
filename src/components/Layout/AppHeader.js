import React from 'react'
import { Link } from 'react-router-dom'
import { withStreamContext } from '../Getstream/Context/GetstremContext'
import Avatar from '../Ui/Avatar'
import Box from '../Ui/Box'
import Divider from '../Ui/Divider'
import Icon from '../Ui/Icon'
import { get } from 'lodash'

const AppHeader = props => {
  const { user } = props

  return (
      <Box>
        <Box display="flex" direction="row" height={40} justify="space-between" align="center">
          <Box width={200}></Box>
          <Box display="flex" width="100%" justify="center">
            <Link to="/">
              <Icon icon="logo" />
            </Link>
          </Box>
          <Box display="flex" width={200}>
            <Link to="/me">
              <Box display="flex">
                <Box marginRight={5}>
                  {user.name}
                </Box>
                <Box>
                  <Avatar size={20} shape="circle" image={get(user, 'profileImage')} />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
        <Divider />
      </Box>
  )
}

export default withStreamContext()(AppHeader)
