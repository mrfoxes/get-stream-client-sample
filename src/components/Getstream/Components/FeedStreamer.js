// @flow

import { filter, isUndefined, last, omit } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { hasData } from '../../../utils/utils'
import Box from '../../Ui/Box'
import Text from '../../Ui/Text'
import ActivityList from '../Base/ActivityList'
import BaseActivityItem from '../Base/BaseActivityItem'
import EmptyFeedList from '../Base/EmptyFeedList'
import LoadingFeedList from '../Base/LoadingFeedList'
import { withStreamContext } from '../Context/GetstremContext'
import { safeRender } from '../utils'

type Props = {
  feed: Array<String>,
  options?: Object,
  exclude?: Array<String>,
  only?: Array<String>,
  component?: Element | Function,
  extraProps: Object
}

class FeedStreamer extends Component<Props> {
  componentDidMount = () => {
    this.fetchFeed()
  }

  state = {
    end: false,
    page: 0,
    loading: true,
    hasError: false,
    errorMessage: '',
    feedStream: [],
  }

  toggleLoading = (value) => {
    if (!isUndefined(value)) {
      return this.setState({
        loading: value,
      })
    }

    return this.setState({
      loading: !this.state.loading,
    })
  }

  getLatestFeedId = () => {
    const { feedStream } = this.state

    if (hasData(feedStream)) {
      const { id } = last(feedStream)

      return id
    }

    return ''
  }

  buildOptions = () => {
    const { options, paginated, itemsPerPage } = this.props

    const cleanedOptions = omit(options, ['limit', 'offset', 'id_gte', 'id_gt', 'id_lte', 'id_it'])

    if (paginated) {
      Object.assign(cleanedOptions, { limit: itemsPerPage, id_lt: this.getLatestFeedId() })
    }

    return cleanedOptions
  }

  fetchFeed = async () => {
    this.toggleLoading(true)
    const { feedStream } = this.state

    const { mystream, feed, itemsPerPage } = this.props

    if (!isUndefined(feed)) {
      try {
        const mergedOptions = this.buildOptions()

        const response = await mystream.getFeed(feed, mergedOptions)

        this.setState({
          feedStream: [...feedStream, ...response.results],
          end: !hasData(response.results) || response.results.length < itemsPerPage,
        }, () => {
          this.toggleLoading(false)
        })
      } catch (e) {
        console.log(e)
        this.setState({
          hasError: true,
        })
      }
    }
  }

  renderEmptyFeedComponent = () => {
    const { emptyFeedComponent } = this.props

    return (
        <Box marginTop={25}>
          {!isUndefined(emptyFeedComponent) && safeRender(emptyFeedComponent)}
          {isUndefined(emptyFeedComponent) && <EmptyFeedList />}
        </Box>
    )
  }

  renderLoadingComponent = () => {
    const { loadingComponent } = this.props

    return (
        <Box marginTop={25}>
          {!isUndefined(loadingComponent) && safeRender(loadingComponent)}
          {isUndefined(loadingComponent) && <LoadingFeedList />}
        </Box>
    )
  }

  filterFeed = (feed) => {
    const { exclude, only } = this.props

    if (only.length !== 0) {
      return filter(feed, activity => only.includes(activity.verb))
    }

    return filter(feed, activity => !exclude.includes(activity.verb))
  }

  renderActivities = () => {
    const { feedStream } = this.state
    const { component, extraProps } = this.props

    return (
        <ActivityList
            feeds={this.filterFeed(feedStream)}
        >
          {isUndefined(component) ? <BaseActivityItem {...extraProps} /> : safeRender(component, extraProps)}
        </ActivityList>
    )
  }

  renderPagination = () => {
    const { feedStream } = this.state
    const { paginated, loading } = this.props
    const canRenderPagination = hasData(feedStream) && paginated && !loading

    if (canRenderPagination) {
      return (
          <button disabled={loading} onClick={this.fetchFeed}>Load Next</button>
      )
    }
  }

  render() {
    const { feedStream, hasError, loading, end } = this.state
    const { endOfStream } = this.props

    const emptyFeed = !hasData(feedStream) && !loading

    if (hasError) {
      return (
          <Box color="flame" padding={25}>
            <div>Cannot load stream. <br />Check your options.</div>
          </Box>
      )
    }

    if (emptyFeed) {
      return this.renderEmptyFeedComponent()
    }

    return (
        <Fragment>
          <Box>
            {hasData(feedStream) && this.renderActivities()}
            {loading && this.renderLoadingComponent()}
          </Box>
          <Box>
            {!end && this.renderPagination()}
            {(end && endOfStream) && (
                <Box display="inlineBlock" marginTop={0}>
                  <h3><Text color="grayBlue">No other activities</Text></h3>
                </Box>
            )}
          </Box>
        </Fragment>
    )
  }
}

FeedStreamer.propTypes = {
  feed: PropTypes.array.isRequired,
  options: PropTypes.object,
  exclude: PropTypes.array,
  only: PropTypes.array,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  paginated: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  emptyFeedComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  loadingComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  extraProps: PropTypes.object,
  endOfStream: PropTypes.bool,
}

FeedStreamer.defaultProps = {
  options: {},
  paginated: false,
  itemsPerPage: 20,
  exclude: [],
  only: [],
  extraProps: {},
  endOfStream: false,
}

export default withStreamContext()(FeedStreamer)
