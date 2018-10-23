import stream from 'getstream'
import { compact, isUndefined } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component, createContext, Fragment } from 'react'
import { createConsumerContext } from '../../../utils/utils'
import FeedManager from '../FeedManager'
import { safeRender } from '../utils'

const { Consumer, Provider } = createContext()

class StreamContextProvider extends Component {
  get client() {
    return this._client
  }

  constructor(props) {
    super(props)

    let mystream = null

    Object.assign(this, {
      setStream(streamClient) {
        mystream = Object.freeze(Object.assign(streamClient))
      },
      getStream() {
        return mystream
      },
    })
  }

  componentDidMount = () => {
    this.init()
  }

  state = {
    hasError: false,
    loading: true,
    session: null,
    user: {},
  }

  init = async () => {
    const { apiKey, apiSecret, appId, options } = this.props

    const connectionData = compact([apiKey, apiSecret, appId, options])

    const client = stream.connect(...connectionData)
    const session = client.createUserSession('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.eSuLY8ZjhQJa-_koVQgHTQ5T0ZczanpfYaBBqZehvDQ')

    try {
      await session.feed('timeline').get({ limit: 0 })

      window.session = session

      this.setStream(new FeedManager(session))
      this.fetchCurrentUserData()
    } catch (e) {
      this.setState({
        hasError: true,
        error: e,
      })
    }
  }

  fetchCurrentUserData = async () => {
    const mystream = this.getStream()

    try {
      const response = await mystream.me()

      this.setState({
        user: response.data,
        userId: mystream.getUserId(),
        loading: false,
      })
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  renderError = () => {
    const { errorComponent } = this.props

    return (
        <Fragment>
          {!isUndefined(errorComponent) && safeRender(errorComponent)}
          {isUndefined(errorComponent) && <div>Connection Error</div>}
        </Fragment>
    )
  }

  renderLoading = () => {
    const { loadingComponent } = this.props

    return (
        <Fragment>
          {!isUndefined(loadingComponent) && safeRender(loadingComponent)}
          {isUndefined(loadingComponent) && <div>Loading...</div>}
        </Fragment>
    )
  }

  render() {
    const {
      hasError,
      loading,
    } = this.state

    if (hasError) {
      return this.renderError()
    }

    if (loading) {
      return this.renderLoading()
    }

    return (
        <Provider
            value={{
              ...this.state,
              mystream: this.getStream(),
              actions: {},
            }}
        >
          {this.props.children}
        </Provider>
    )
  }
}

StreamContextProvider.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string,
  appId: PropTypes.string,
  options: PropTypes.string,
  errorComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  loadingComponent: PropTypes.element,
  onError: PropTypes.oneOf([PropTypes.func, PropTypes.number]),
}

StreamContextProvider.defaultProps = {
  onError: null,
}

export const withStreamContext = createConsumerContext(Consumer)

export default StreamContextProvider
