CREATE DATABASE OnlineStore

CREATE TABLE Products(
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name varchar(50) NOT NULL,
	stock int NOT NULL,
	price decimal(5, 2) NOT NULL
);

CREATE TABLE Users(
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email varchar(50) NOT NULL,
	password char(60) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	role int NOT NULL,
	UNIQUE KEY(email)
);

CREATE TABLE Purchases(
	user_id int NOT NULL,
	product_id int NOT NULL,
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	amount int NOT NULL,
	date date NOT NULL,
	CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES Users(id),
	CONSTRAINT fk_purchase_product FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Likes(
	flag int NOT NULL,
	product_id int NOT NULL,
	user_id int NOT NULL,
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES Users(id),
	CONSTRAINT fk_like_product FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE PricesLog(
	previous_price decimal(5, 2) NOT NULL,
	new_price decimal(5, 2) NOT NULL,
	change_date date NOT NULL,
	product_id int NOT NULL,
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	CONSTRAINT fk_log_product FOREIGN KEY (product_id) REFERENCES Products(id)
)