DROP DATABASE IF EXISTS corizzy_database;
DROP USER IF EXISTS corizzy_user;
CREATE USER corizzy_user;
CREATE DATABASE corizzy_database;
\c corizzy_database;

-- PRODUCTS TABLE
DROP TABLE IF EXISTS products_table;
CREATE TABLE products_table(
  "id" serial NOT NULL,
  PRIMARY KEY("id"),
  inventory integer NOT NULL,
  product_name varchar(250) NOT NULL,
  price int NOT NULL DEFAULT 0.0
  );

-- AUTHORS TABLE
DROP TABLE IF EXISTS authors_table;
CREATE TABLE authors_table(
  "id" serial NOT NULL,
  PRIMARY KEY("id"),
  author varchar(250) NOT NULL
  );
-- ARTICLES TABLE
DROP TABLE IF EXISTS articles_table;
CREATE TABLE articles_table(
  "id" serial NOT NULL,
  PRIMARY KEY("id"),
  title varchar(250) NOT NULL,
  urlTitle varchar(450),
  fk_author_id int REFERENCES authors_table(id)
  );
