DROP DATABASE If EXISTS qna;

CREATE DATABASE qna;

\c qna;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE [IF NOT EXISTS] questions(
  question_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL UNIQUE,
  time_stamp TIMESTAMP NOT NULL,
  user VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL
);

CREATE TABLE [IF NOT EXISTS] answers(
  answer_id serial PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL UNIQUE,
  time_stamp TIMESTAMP NOT NULL,
  user VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL,
  photos TEXT [],
  CONSTRAINT fk_question
      FOREIGN KEY(question_id)
	      REFERENCES question(question_id)
);

CREATE TABLE [IF Not EXISTS] photos(
  photo_id serial PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(150),
  CONSTRAINT fk_answer
      FOREIGN KEY(answer_id)
	      REFERENCES answers(answer_id)
);