const express = require('express');
const app = express();
const controller = require('./controllers.js');
const PORT = process.env.PORT || 3000;

// app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// get questions for a product
app.get('/qa/questions/:product_id', (req, res) => {
  controller.getQuestions(req, res);
})

// add a question
app.post('/qa/questions', (req, res) => {
  controller.addQuestion(req, res);
})

// mark a question as useful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  controller.markQuestion(req, res);
})

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  controller.reportQuestion(req, res);
})

// get answers for a question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  controller.getAnswers(req, res);
})

// add an answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  controller.addAnswer(req, res);
})

// mark an answer as useful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  controller.markAnswer(req, res);
})

// report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  controller.reportAnswer(req, res);
})

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })


module.exports = { app };