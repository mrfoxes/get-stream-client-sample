import React from 'react'
import { renderRoutes } from 'react-router-config'
import Error from '../Base/Error'
import StreamContextProvider from '../Getstream/Context/GetstremContext'
import AppHeader from '../Layout/AppHeader'

const Root = ({ route, ...props }) => (
  <StreamContextProvider
    apiKey="ymepxr43kehv"
    userToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.eSuLY8ZjhQJa-_koVQgHTQ5T0ZczanpfYaBBqZehvDQ"
    errorComponent={<Error />}
    loadingComponent={null}
  >
    <AppHeader /> {renderRoutes(route.routes, props)}{' '}
  </StreamContextProvider>
)

export default Root
