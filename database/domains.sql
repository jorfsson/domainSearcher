DROP DATABASE IF EXISTS domains;
CREATE DATABASE domains;

\c domains

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE searches (
  ID SERIAL PRIMARY KEY,
  search_term VARCHAR NOT NULL
);

CREATE TABLE domains (
  ID SERIAL PRIMARY KEY,
  URL VARCHAR NOT NULL
);

CREATE TABLE search_results (
  ID SERIAL PRIMARY KEY,
  search_id INT NOT NULL,
  domain_id INT NOT NULL,
  conversions INT NOT NULL
  CONSTRAINT search_id_fkey FOREIGN KEY (search_id)
    REFERENCES searches (ID) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT domain_id_fkey FOREIGN KEY (domain_id)
    REFERENCES domains (ID) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
)
