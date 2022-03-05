const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Mjolnir117!',
  database: 'qna',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// pool.query('select * from questions where reported = (false) limit 2', (err, result) => {
//   if (err) {
//     console.log('Error executing query', err);
//   } else {
//     console.log('There is a result: ', result.rows)
//   }
// })

const getQuestions = (productID, count, callback) => {
  const queryArgs = [productID, false, count || 5];
  pool.query('SELECT * FROM questions WHERE product_id = $1 AND reported = $2 LIMIT $3', queryArgs, (err, questions) => {
    if (err) {
      callback(err);
    } else {
      callback(null, questions.rows);
    }
  })
}

const getAnswers = (questionID, count, callback) => {
  const queryArgs = [questionID, count, false];
  pool.query('SELECT * FROM answers WHERE question_id = $1 AND reported = $2 LIMIT $3', queryArgs, (err, answers) => {
    if (err) {
      callback(err);
    } else {
      callback(null, answers.rows);
    }
  })
}

const getPhotos = (answerID, callback) => {
  const queryArgs = [answerID];
  pool.query('SELECT * FROM photos WHERE answer_id = $1 LIMIT 10', queryArgs, (err, photos) => {
    if (err) {
      callback(err);
    } else {
      callback(null, photos.rows);
    }
  })
}

module.exports = { getQuestions, getAnswers, getPhotos }