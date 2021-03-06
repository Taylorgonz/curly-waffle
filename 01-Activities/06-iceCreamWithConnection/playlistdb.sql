

DROP TABLE IF EXISTS playlistdb;

CREATE DATABASE playlistdb;

USE playlistdb;

CREATE TABLE songs (
  id INT NOT NULL AUTO_INCREMENT,
  title varchar(25) DEFAULT NULL,
  artist varchar(25) DEFAULT NULL,
  genre varchar(25) DEFAULT NULL,
  PRIMARY KEY (ID)
) 

INSERT INTO songs (title, artist, genre) VALUES
("Therefore I Am", "Billy Eilish", "pop");
INSERT INTO songs (title, artist, genre) VALUES
("Birmingham", "Shovels & Rope", "folk");
INSERT INTO songs (title, artist, genre) VALUES
("I Ain't Got Time", "Tyler the Creator", "Rap");

