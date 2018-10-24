import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'

const AppRouter = () => (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
)

export default AppRouter
