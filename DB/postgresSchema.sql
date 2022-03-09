DROP DATABASE If EXISTS qna;

CREATE DATABASE qna;

\c qna;

DROP TABLE IF EXISTS questions, answers, photos;

CREATE TABLE questions(
  question_id BIGSERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT NOT NULL,
  question_date TIMESTAMPTZ DEFAULT Now(),
  asker_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT false,
  question_helpfulness INT DEFAULT 0
);

CREATE TABLE answers(
  answer_id BIGSERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  "date" TIMESTAMPTZ DEFAULT Now(),
  answerer_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT false,
  helpfulness INT DEFAULT 0
);

CREATE TABLE photos(
  photo_id BIGSERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  photo_url VARCHAR(150) NOT NULL
);

CREATE INDEX ON answers (question_id);
CREATE INDEX ON photos (answer_id);
CREATE INDEX ON questions (reported) WHERE reported = (false);