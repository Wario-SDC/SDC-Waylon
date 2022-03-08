\c qna;

\COPY questions (product_id, question_body, question_date, asker_name, email, reported, question_helpfulness) FROM 'DB/questions-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

\COPY answers (question_id, body, "date", answerer_name, email, reported, helpfulness) FROM 'DB/answers-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

\COPY photos (answer_id, photo_url) FROM 'DB/answers_photos-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

ALTER TABLE answers
ADD CONSTRAINT fk_question
      FOREIGN KEY(question_id)
	      REFERENCES questions(question_id)
ON DELETE CASCADE;

ALTER TABLE photos
ADD CONSTRAINT fk_answer
      FOREIGN KEY(answer_id)
	      REFERENCES answers(answer_id)
ON DELETE CASCADE;