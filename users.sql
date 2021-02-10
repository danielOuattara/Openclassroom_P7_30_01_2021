 CREATE DATABASE usersData;
 USE usersData;
 
 CREATE TABLE users (
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    gender CHAR(1) NOT NULL,
    date_birth DATETIME NOT NULL,
	department VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
    pswd VARCHAR(50) NOT NULL,
	account_creation_date DATETIME NOT NULL,
    PRIMARY KEY (user_id)
)
ENGINE=INNODB;

DESCRIBE users;
DROP TABLE users;

-- données de remplissage à recupérer du FRONT de l 'application
-- INSERT INTO users VALUES (NULL, -



 CREATE TABLE usersSharings (
    id_sharings SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    comments VARCHAR(200) NULL,
    comments_date DATETIME NOT NULL,
    photo_url VARCHAR(200) NULL,
    photo_date DATETIME NOT NULL,
    PRIMARY KEY (id_sharings)
)
ENGINE=INNODB;

DESCRIBE usersSharings;
DROP TABLE usersSharings;


-- données de remplissage à recupérer du FRONT de l 'application
-- INSERT INTO users VALUES (NULL, -