DROP TABLE IF EXISTS GreatBaydb;

CREATE DATABASE GreatBaydb;

USE GreatBaydb;

CREATE TABLE auctions (
  id INT NOT NULL AUTO_INCREMENT,
  item_name varchar(25) DEFAULT NULL,
  category varchar(25) DEFAULT NULL,
  starting_bid INTEGER(50) DEFAULT NULL,
  highest_bid INTEGER(50) DEFAULT NULL,
  PRIMARY KEY (ID)
) 
