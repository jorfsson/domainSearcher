DROP DATABASE IF EXISTS domains;
CREATE DATABASE domains;

\c domains

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  UNIQUE(name)
);

CREATE TABLE searches (
  ID SERIAL PRIMARY KEY,
  search_term VARCHAR NOT NULL,
  UNIQUE(search_term)
);

CREATE TABLE domains (
  ID SERIAL PRIMARY KEY,
  url VARCHAR NOT NULL,
  UNIQUE(url)
);

CREATE TABLE searches_domains (
  ID SERIAL PRIMARY KEY,
  search_id INT NOT NULL,
  domain_id INT NOT NULL,
  conversions INT DEFAULT 0,
  CONSTRAINT search_id_fkey FOREIGN KEY (search_id)
    REFERENCES searches (ID) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT domain_id_fkey FOREIGN KEY (domain_id)
    REFERENCES domains (ID) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  UNIQUE (search_id, domain_id)
)
