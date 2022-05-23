'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const username = process.env.RDS_USERNAME
  const password = process.env.RDS_PASSWORD
  const hostname = process.env.RDS_HOSTNAME
  const database = process.env.RDS_DATABASE

  console.log(process.env)

  fastify.register(require('@fastify/mysql'), {
    connectionString: `mysql://${username}:${password}@${hostname}/${database}`
  })
})