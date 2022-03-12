const { Pool } = require('pg')
const config = require('../config.js')

const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.database,
})



module.exports = pool