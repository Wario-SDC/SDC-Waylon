const { Pool } = require('pg')
const pass = require('../config.js')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: pass,
  database: 'qna',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.query('select * from questions where reported = (false) limit 2', (err, result) => {
  if (err) {
    console.log('Error executing query', err);
  } else {
    console.log('There is a result: ', result.rows)
  }
})

const getQuestions = (callback) => {
  pool.query('SELECT * FROM questions WHERE')
}

module.exports = { getQuestions }