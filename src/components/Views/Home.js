import React, { Component } from 'react'
import MultiFeedRenderer from '../Base/MultiFeedRenderer'
import FeedStreamer from '../Getstream/Components/FeedStreamer'
import Box from '../Ui/Box'
import Text from '../Ui/Text'

class Home extends Component {
  render() {
    return (
        <Box display="block" marginTop={25}>
          <Box display="flex" justify="center">
            <Box display="flex" width="80%">
              <Box display="flex" marginRight="auto" marginLeft="auto" direction="column" maxWidth={400}>
                <Box marginBottom={25}>
                  <Text color="flame">
                    <h2>Timeline</h2>
                  </Text>
                </Box>
                <Box marginBottom={50}>
                  <FeedStreamer
                      feed={['timeline']}
                      only={['post']}
                      component={MultiFeedRenderer}
                      extraProps={{ someExtraProps: true }}
                      paginated
                      itemsPerPage={5}
                      endOfStream
                  />
                </Box>
              </Box>
              <Box display="flex" marginRight={100} width={200} flex={0.5} direction="column">
                <Box display="block" color="white" marginBottom={25}>
                  <Text color="vividGambodge">
                    <h4>Recent Comments</h4>
                  </Text>
                </Box>
                <Box display="flex" marginTop={25}>
                  <FeedStreamer
                      feed={['timeline']}
                      only={['reply']}
                      component={MultiFeedRenderer}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
    )
  }
}

export default Home
