const userResolver = require('./user')
const postResolver = require('./post')
const commentResolver = require('./comment')
const replyResolver = require('./reply')

const rootResolver = {
  ...userResolver,
  ...postResolver,
  ...commentResolver,
  ...replyResolver
}

module.exports = rootResolver