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

// questions related to a product
const getQuestions = (productID, count = 5, callback) => {
  const queryArgs = [productID, false, count];
  // const queryString = `SELECT * FROM questions WHERE product_id = $1 AND reported = $2 LIMIT $3`
  // const queryString = `SELECT questions.*,
  //                      json_build_object('answers', (SELECT json_agg(row_to_json(answers))FROM answers WHERE answers.question_id = questions.question_id AND reported = $2)) FROM questions WHERE questions.product_id = $1 AND reported = $2 LIMIT $3`;
  const queryString = `SELECT *, (SELECT json_object_agg(a.answer_id, row_to_json(a)) FROM (SELECT *, (SELECT json_agg(p) FROM (SELECT photo_url FROM photos WHERE answer_id = answers.answer_id) p) photos FROM answers WHERE question_id = questions.question_id) a) answers FROM questions WHERE product_id = $1 AND reported = $2 ORDER BY question_id ASC LIMIT $3`;

pool.query(queryString, queryArgs, (err, questions) => {
    //console.log(questions)
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, questions.rows);
      }
    });
}

// post a new question
const addAQuestion = (params, callback) => {
  const queryArgs = [params.prod_id, params.body, params.name, params.email];
  pool.query('INSERT INTO questions(product_id, question_body, asker_name, email) VALUES ($1, $2, $3, $4)', queryArgs, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

// mark a question as helpful
const questionHelpful = (questionID, callback) => {
  const queryArgs = [questionID];
  pool.query('UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1', queryArgs, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

// report a question
const questionReport = (questionID, callback) => {
  const queryArgs = [questionID];
  pool.query('UPDATE questions SET reported = NOT reported WHERE question_id = $1', queryArgs, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

// get answers related to a question
const getAnswers = (questionID, count = 5, callback) => {
  // 'SELECT * FROM answers WHERE question_id = $1 AND reported = $3 LIMIT $2'
  const queryString = `SELECT *, (SELECT json_agg(p) FROM (SELECT photo_id, photo_url FROM photos WHERE answer_id = answers.answer_id) p) photos FROM answers WHERE question_id = $1 AND reported = $2 ORDER BY answer_id ASC LIMIT $3`;
  const queryArgs = [questionID, false, count];
  pool.query(queryString, queryArgs, (err, answers) => {
    if (err) {
      callback(err);
    } else {
      callback(null, answers.rows);
    }
  })
}

// post a new answer
const addAnswer = (questionID, body, callback) => {
  const queryArgs = [questionID, body.body, body.name, body.email];
  pool.query('INSERT INTO answers (question_id, body, answerer_name, email) VALUES ($1, $2, $3, $4)', queryArgs, (err) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      if (body.photos && body.photos.length > 0) {
        photosArr = body.photos.split(',');
        console.log(photosArr[1]);
        photosArr.map((photo) => {
          const photoArgs = [photo];
          pool.query('INSERT INTO photos (photo_url, answer_id) VALUE ($1, (SELECT * FROM answers ORDER BY answer_id DESC limit 1))', photoArgs, (err) => {
            if (err) {
              callback(err);
            }
          })
        })
        callback(null);
      } else {
        callback(null);
      }
    }
  })
}

// mark an answer as helpful
const answerHelpful = (answerID, callback) => {
  const queryArgs = [answerID];
  pool.query('UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1', queryArgs, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

// report an answer
const answerReport = (answerID, callback) => {
  const queryArgs = [answerID];
  pool.query('UPDATE answers SET reported = NOT reported WHERE answer_id = $1', queryArgs, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

// get photos related to an answer
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

module.exports = { getQuestions, addAQuestion, questionHelpful, questionReport, getAnswers, addAnswer, answerHelpful, answerReport, getPhotos }