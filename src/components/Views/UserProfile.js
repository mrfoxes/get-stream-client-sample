import React, { Component } from 'react'
import EmptyUserFeed from '../Base/EmptyUserFeed'
import MultiFeedRenderer from '../Base/MultiFeedRenderer'
import FeedStreamer from '../Getstream/Components/FeedStreamer'
import { withStreamContext } from '../Getstream/Context/GetstremContext'
import Avatar from '../Ui/Avatar'
import Box from '../Ui/Box'
import Divider from '../Ui/Divider'
import Text from '../Ui/Text'
import { get } from 'lodash'

class UserProfile extends Component {
  state = {
    loadingProfileData: true,
    userData: {},
  }
  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props
    const { mystream } = this.props

    try {
      const response = await mystream.getUser(id)

      this.setState({
        userData: response.data,
        loadingProfileData: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { userData } = this.state
    const { match: { params: { id } } } = this.props

    return (
        <Box>
          <Box display="flex" align="center" padding={25} direction="column">
            <Box padding={25}>
              <Avatar size={150} shape="circle" image={get(userData, 'profileImage')} />
            </Box>
            <Text color="spanishBlue" fontSize="lg">
              {id}
            </Text>
          </Box>
          <Box width="40%" marginTop={25} marginRight='auto' marginLeft='auto'>
            <Box display="flex" width="30%" marginBottom={50} marginRight='auto' marginLeft='auto'><Divider /></Box>
            <FeedStreamer
                feed={['user', id]}
                only={['post']}
                component={MultiFeedRenderer}
                extraProps={{ someExtraProps: true }}
                paginated
                emptyFeedComponent={EmptyUserFeed}
            />
          </Box>
        </Box>
    )
  }
}

export default withStreamContext()(UserProfile)
