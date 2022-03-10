const { Pool } = require('pg')
const pass = require('../config.js')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: pass,
  database: 'qna',
})



module.exports = pool