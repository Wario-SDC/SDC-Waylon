const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
// const controller = require('./controller.js');
const models = require('./models.js');

// app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/qa/questions', (req, res) => {
  models.getQuestions(req.query.id, req.query.count, function(err, questions) {
    if (err) {
      res.status(500);
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

app.get('/qa/questions/:id/answers', (req, res) => {
  models.getAnswers(req.params.id, req.query.count, function(err, answers) {
    if (err) {
      res.status(500);
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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})