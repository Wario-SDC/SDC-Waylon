\c qna;

\COPY questions FROM 'DB/questions-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

\COPY answers FROM 'DB/answers-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;
ALTER TABLE answers
ADD CONSTRAINT fk_question
      FOREIGN KEY(question_id)
	      REFERENCES questions(question_id)
ON DELETE CASCADE;

\COPY photos FROM 'DB/answers_photos.csv' WITH DELIMITER ',' NULL as ' ' CSV header;
ALTER TABLE photos
ADD CONSTRAINT fk_answer
      FOREIGN KEY(answer_id)
	      REFERENCES answers(answer_id)
ON DELETE CASCADE;

