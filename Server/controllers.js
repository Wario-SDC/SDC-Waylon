const models = require('./models.js');

// get questions for a product
const getQuestions = (req, res) => {
  models.getQuestions(req.params.product_id, req.query.count, function(err, questions) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200)
      if (questions.length <=0 ) {
        res.send('Current product has no associated questions.');
      } else {
        res.send(questions);
      }
    }
  });
}

// add a question
const addQuestion = (req, res) => {
  console.log(req.body);
  models.addAQuestion(req.body, function(err) {
    if (err) {
      res.status(500).send(err);
      res.send(err);
    } else {
      res.status(201);
      res.send('Question added');
    }
  })
}

// mark a question as useful
const markQuestion = (req, res) => {
  models.questionHelpful(req.params.question_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
}

// report a question
const reportQuestion = (req, res) => {
  models.questionReport(req.params.question_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
}

// get answers for a question
const getAnswers = (req, res) => {
  //console.log(req.params.question_id)
  models.getAnswers(req.params.question_id, req.query.count, function(err, answers) {
    if (err) {
      //console.log('success')
      res.status(500).send(err);
    } else {
      res.status(200)
      if (answers.length <= 0) {
        res.send('Current question has no associated answers.');
      } else {
        res.send(answers);
      }
    }
  });
}

// add an answer
const addAnswer = (req, res) => {
  models.addAnswer(req.params.question_id, req.body, function(err) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(201);
      res.send('Answer added');
    }
  })
}

// mark an answer as useful
const markAnswer = (req, res) => {
  models.answerHelpful(req.params.answer_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send();
    }
  })
}

// report an answer
const reportAnswer = (req, res) => {
  models.answerReport(req.params.answer_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
}

module.exports = { getQuestions, addQuestion, markQuestion, reportQuestion, getAnswers, addAnswer, markAnswer, reportAnswer}