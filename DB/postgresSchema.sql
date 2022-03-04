DROP DATABASE If EXISTS qna;

CREATE DATABASE qna;

\c qna;

DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions(
  question_id BIGSERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL
);

CREATE TABLE answers(
  answer_id BIGSERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfull INT NOT NULL
);

CREATE TABLE photos(
  photo_id BIGSERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(150) NOT NULL
);