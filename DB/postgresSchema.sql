DROP DATABASE If EXISTS qna;

CREATE DATABASE qna;

\c qna;

DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions(
  question_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL
);

CREATE TABLE answers(
  answer_id serial PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL,
  CONSTRAINT fk_question
      FOREIGN KEY(question_id)
	      REFERENCES questions(question_id)
);

CREATE TABLE photos(
  photo_id serial PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(150) NOT NULL,
  CONSTRAINT fk_answer
      FOREIGN KEY(answer_id)
	      REFERENCES answers(answer_id)
);