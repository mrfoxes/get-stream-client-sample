import React, { Component } from 'react'
import AppHeader from './components/Layout/AppHeader'
import Box from './components/Ui/Box'

class App extends Component {
  render() {
    return (
        <Box display="block">
          <AppHeader />
          <Box display="block" align="center">
            <Box width="40%" marginRight="auto" marginLeft="auto">
            </Box>
          </Box>
        </Box>
    )
  }
}

export default App
