const fs = require('fs');
const csv = require('csv');

fs.createReadStream('questions.csv')
  .pipe(csv.parse({columns: true}))
  .pipe(csv.transform((input) => {
    return Object.assign({}, input, {
      date_written: (new Date(parseInt(input['date_written']))).toUTCString()
    });
  }))
  .pipe(csv.stringify({header: true}))
  .pipe(fs.createWriteStream('./questions-processed.csv'))
  .on('finish', () => {
    console.log('Done');
  });

  fs.createReadStream('answers.csv')
  .pipe(csv.parse({columns: true}))
  .pipe(csv.transform((input) => {
    return Object.assign({}, input, {
      date_written: (new Date(parseInt(input['date_written']))).toUTCString()
    });
  }))
  .pipe(csv.stringify({header: true}))
  .pipe(fs.createWriteStream('./answers-processed.csv'))
  .on('finish', () => {
    console.log('Done');
  });