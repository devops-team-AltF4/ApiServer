'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const username = process.env.RDS_USERNAME_STAG
  const password = process.env.RDS_PASSWORD_STAG
  const hostname = process.env.RDS_HOSTNAME_STAG
  const database = process.env.RDS_DATABASE_STAG

  console.log(process.env)

  fastify.register(require('@fastify/mysql'), {
    connectionString: `mysql://${username}:${password}@${hostname}/${database}`
  })
})