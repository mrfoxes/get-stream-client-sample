import { compact } from 'lodash'

class FeedManager {
  constructor(session) {
    Object.assign(this, {
      getSession() {
        return session
      },
    })
  }

  getFeed(args: Array<String>, options: Object): Promise {
    const session = this.getSession()

    return session.feed(...compact(args)).get(options)
  }

  getUser(userId) {
    const session = this.getSession()

    return session.getUser(userId).get()
  }

  getUserId() {
    const session = this.getSession()

    return session.userId
  }

  getUserIdOrCurrent(userId = '') {
    return userId !== '' ? userId : this.getUserId()
  }

  me() {
    const session = this.getSession()
    const { userId } = session

    return this.getUser(userId)
  }

  getFollowing(userId) {
    const session = this.getSession()
    const id = this.getUserIdOrCurrent(userId)

    return session.feed('timeline', id).following()
  }

  getFollowers(userId) {
    const session = this.getSession()
    const id = this.getUserIdOrCurrent(userId)

    return session.feed('timeline', id).followers()
  }
}

export default FeedManager
