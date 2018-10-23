import React from 'react'
import { renderRoutes } from 'react-router-config'
import Error from '../Base/Error'
import StreamContextProvider from '../Getstream/Context/GetstremContext'
import AppHeader from '../Layout/AppHeader'

const Root = ({ route, ...props }) => (
    <StreamContextProvider
        apiKey="ymepxr43kehv"
        errorComponent={<Error />}
        loadingComponent={null}
    >
      <AppHeader />
      {renderRoutes(route.routes)}
    </StreamContextProvider>
)

export default Root
