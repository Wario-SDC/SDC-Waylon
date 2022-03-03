const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
// const db = require('./db');
// const controller = require('./controller.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})