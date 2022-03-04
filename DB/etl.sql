\c qna;

\COPY questions FROM 'DB/questions-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

\COPY answers FROM 'DB/answers-processed.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

\COPY photos FROM 'DB/answers_photos.csv' WITH DELIMITER ',' NULL as ' ' CSV header;

