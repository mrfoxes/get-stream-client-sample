import Home from '../Views/Home'
import Me from '../Views/Me'
import Root from '../Views/Root'
import UserProfile from '../Views/UserProfile'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/users/:id',
        exact: true,
        component: UserProfile,
      },
      {
        path: '/me',
        component: Me,
        routes: [
          {
            path: '/me',
            exact: true,
            component: UserProfile,
          },
          {
            path: '/me/followers',
            exact: true,
            component: UserProfile,
          },
          {
            path: '/me/following',
            exact: true,
            component: UserProfile,
          },
        ],
      },
    ],
  },
]

export default routes
