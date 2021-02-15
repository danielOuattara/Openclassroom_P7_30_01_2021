CREATE DATABASE groupomania;
use groupomania;

 CREATE TABLE users (
    userID SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NULL,
    lastName VARCHAR(30) NULL,
    gender CHAR(1) NULL,
    age SMALLINT NULL,
	department VARCHAR(30) NULL,
	email VARCHAR(30) NOT NULL,
    pswd VARCHAR(20) NOT NULL,
	accountCreationDate DATETIME NULL,
    PRIMARY KEY (userID)
)
ENGINE=INNODB;