# Stram Client Sample

Sample implementation for [Getstream](https://getstream.io/) JS client.
The project was scaffolder with a standard create-react-app boilderplate without any modifications.

##Getting Started

```Bash
yarn && yarn start
```

## Structure

    ├── components
    	├── Base
    	├── Getstream // Getstream specific implementation
    	├── Layout // Layout components
    	├── Router // Router files
    	├── Ui // Basic flexible Ui components
    	└── Views // Pages
    ├── config
    ├── theme
    └── utils

##Development

To use you own credentials go to src/component/Views/Root.js and replace with your own

```Javascript
const Root = ({ route, ...props }) => (
	<StreamContextProvider
		apiKey="ymepxr43kehv"
		userToken="eyJ0eXAiOiJKV1Q........."
........
```

## Components

Getstream client implementation is done inside src/components/Getsream.

Three main components are provided:

- FeedStreamer
- StreamContextProvider
- ActivitySwitchRenderer

####FeedStreamer
Props

```Javascript
{
  feed: Array<String>, // Accept an array like the one allowed by the stream js client "client.feed('timeline', 'jack')", used to choose the feed to retrieve
  options?: Object, // Feed options, same as passed throw ".get({})" for stream js client
  exclude?: Array<String>, // Verbs to exclude (At display time)
  only?: Array<String>, // Show only some verbs (At display time)
  component?: Element | Function, // Component to render an activity
  extraProps: Object, // Extra props to pass throw rendered activities
  paginated: Boolean, // Enable pagination
  itemsPerPage: Number, // Number of items per page
  emptyFeedComponent: Element | Function, // Component used for an empty feed
  loadingComponent: Element | Function, // Component used when loading
  endOfStream: Boolean, // Component used at the end of a stream
}
```

####ActivitySwitchRenderer

```Javascript
{
  verbs: Object, // Object containing the mapping verb: Component (See exmaple below '{ post: PostActivity, reply: ReplyActivity }')
  activity: Object // Activity to be rendered based on mapping
}
```

####StreamContextProvider

```Javascript
{
  apiKey: String, // Api key
  apiSecret?: String, // Api Secret Optional
  appId?: String, // App Id
  userToken: String, // User session token
  options?: String, // Options
  errorComponent: Element | Function, // Used to render a connection error
  loadingComponent: Element | Function, // Userd to render a loading component
  onError: Function | Number // Run on error
}
```

## Instructions

Your app must be wrapped into the **StreamContextProvider** to allow other components to inherit stream client session and work properly

Example:

```javascript
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
    <AppHeader /> {renderRoutes(route.routes)}{' '}
  </StreamContextProvider>
)

export default Root
```

One the context is correctly configured you can use the **FeedStreamer** High Level Component to render client feed.

Example:

```Javascript
<FeedStreamer
	feed={['timeline']}
	only={['post']}
	component={MultiFeedRenderer}
	extraProps={{ someExtraProps: true }}
	paginated
	itemsPerPage={5}
	endOfStream
/>
```

The _component_ properities accept a component to be used to render activities.

The **ActivitySwitchRenderer** component can be used to build multi feed activity renderer. Usefull if your feed contains different _verbs_ .

Example: src/Base/MultiFeedRendere.js

```Javascript
import React from 'react'
import ActivitySwitchRenderer from '../Getstream/Components/ActivitySwitchRenderer'
import PostActivity from './PostActivity'
import ReplyActivity from './ReplyActivity'

const MultiFeedRenderer = ({ activity, ...props }) => {
  return (
      <ActivitySwitchRenderer
          activity={activity}
          verbs={{
            post: PostActivity,
            reply: ReplyActivity,
          }}
          {...props}
      />
  )
}

export default MultiFeedRenderer
```

##Tests

To run test

    yarn test
    
Sample tests are provided for:
- index
- Text
- ActivitySwitchRenderer
