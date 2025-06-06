const redis = require('../config/redis.config')
const rateLimiter = async (req, res, next) => {
  const clientId = req.headers?.client_id

  const currentTime = Date.now() // in milliseconds

  const client = await redis.hGetAll(`rateLimit-${clientId}`)

  if (Object.keys(client).length === 0) {
    // If client does not exist, create a new one
    await redis.hSet(`rateLimit-${clientId}`, 'createAt', currentTime)
    await redis.hSet(`rateLimit-${clientId}`, 'count', 1)

    return next()
  }

  let difference = (currentTime - parseInt(client.createAt, 10)) / 1000 // in seconds
  let count = parseInt(client.count, 10)
  if (difference > +process.env.RATE_LIMIT_RESET) {
    count = 1
    await redis.hSet(`rateLimit-${clientId}`, 'createAt', currentTime)
    await redis.hSet(`rateLimit-${clientId}`, 'count', count)
    return next()
  }

  if (count > +process.env.RATE_LIMIT_COUNT) {
    return res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Please try again later.',
    })
  } else {
    count += 1
    await redis.hSet(`rateLimit-${clientId}`, 'count', count)
    return next()
  }
}
module.exports = rateLimiter
