'use strict'
const fastify = require('fastify')()

module.exports = async function (fastify, opts) {
  fastify.get('/', function (request, reply) {
    fastify.mysql.getConnection(onConnect)

    function onConnect (err, client) {
      if (err) return reply.send(err)

      client.query(
        'SELECT now()', [],
        function onResult (err, result) {
          client.release()
          reply.send(err || result)
        }
      )
    }
  })
}
