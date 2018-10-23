import { get } from 'lodash'
import React, { Component, Fragment } from 'react'
import MeEmptyFeed from '../Base/MeEmptyFeed'
import MultiFeedRenderer from '../Base/MultiFeedRenderer'
import FeedStreamer from '../Getstream/Components/FeedStreamer'
import { withStreamContext } from '../Getstream/Context/GetstremContext'
import Avatar from '../Ui/Avatar'
import Box from '../Ui/Box'
import Divider from '../Ui/Divider'
import Icon from '../Ui/Icon'
import Text from '../Ui/Text'

class Me extends Component {
  state = {
    loading: true,
    userData: {},
    followings: {
      users: [],
      results: [],
    },
    followers: {
      users: [],
      results: [],
    },
  }
  componentDidMount = async () => {
    try {
      await Promise.all([this.fetchFollowing(), this.fetchFollowers()])

      this.setState({
        loading: false,
      })
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  fetchFollowers = async () => {
    const { mystream } = this.props

    try {
      const response = await mystream.getFollowers()

      this.setState({
        followers: {
          users: response.results,
          results: response.users,
        },
      })
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  fetchFollowing = async () => {
    const { mystream } = this.props

    try {
      const response = await mystream.getFollowing()

      this.setState({
        followings: {
          users: response.results,
          results: response.users,
        },
      })
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  render() {
    const { followers, followings, loading } = this.state
    const { userId, user } = this.props

    return (
        <Box>
          <Box display="flex" align="center" padding={25} direction="column">
            <Box padding={25}>
              <Avatar size={150} shape="circle" image={get(user, 'profileImage')} />
            </Box>
            <Text color="spanishBlue" fontSize="lg">
              {userId}
            </Text>
          </Box>
          <Box width="40%" marginTop={25} marginRight='auto' marginLeft='auto'>
            <Box display="flex" width="30%" marginRight='auto' marginLeft='auto'><Divider /></Box>
            <Box display="flex" height={50} justify="center" align="center">
              {loading && (
                  <Icon icon="loader" />
              )}
              {!loading && (
                  <Fragment>
                    <Box>
                      <Text color="grayBlue">
                        Followers: <Text color="flame" weight="bold">{followers.users.length}</Text>
                      </Text>
                    </Box>
                    <Box width={25} />
                    <Box>
                      <Text color="grayBlue">
                        Followings: <Text color="flame" weight="bold">{followings.users.length}</Text>
                      </Text>
                    </Box>
                  </Fragment>
              )}
            </Box>
            <Box display="flex" width="30%" marginRight='auto' marginLeft='auto'><Divider /></Box>
            <FeedStreamer
                feed={['user', userId]}
                only={['post']}
                component={MultiFeedRenderer}
                extraProps={{ someExtraProps: true }}
                paginated
                emptyFeedComponent={MeEmptyFeed}
            />
          </Box>
        </Box>
    )
  }
}

export default withStreamContext()(Me)
