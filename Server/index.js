const express = require('express');
const app = express();
// const controller = require('./controller.js');
const models = require('./models.js');
const PORT = process.env.PORT || 3000;

// app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// get questions for a product
app.get('/qa/questions/:product_id', (req, res) => {
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
})

// add a question
app.post('/qa/questions', (req, res) => {
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
})

// mark a question as useful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  models.questionHelpful(req.params.question_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
})

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  models.questionReport(req.params.question_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
})

// get answers for a question
app.get('/qa/questions/:question_id/answers', (req, res) => {
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
})

// add an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  models.addAnswer(req.params.question_id, req.body, function(err) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(201);
      res.send('Answer added');
    }
  })
})

// mark an answer as useful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  models.answerHelpful(req.params.answer_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send();
    }
  })
})

// report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  models.answerReport(req.params.answer_id, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204);
      res.send('Update successful');
    }
  })
})

// get photos for an answer
app.get('/qa/answers/:id/photos', (req, res) => {
  models.getAnswers(req.params.id, function(err, photos) {
    if (err) {
      res.status(500);
    } else {
      res.status(200)
      if (photos.length <= 0) {
        res.send('Current answer has no associated photos.');
      } else {
        res.send(photos);
      }
    }
  });
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })
}


module.exports = { app };