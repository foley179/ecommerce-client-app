/* Database */
CREATE DATABASE pern_ecommerce_app;

/* products table */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    image VARCHAR(100)
    /*TODO: add description*/
);

/* insert mock data into products table */
INSERT INTO products(name, price, image)
VALUES('laptop', 100000, './resources/laptop.jpg'),
VALUES('mouse', 1000, './resources/mouse.jpg'),
VALUES('keyboard', 3000, './resources/keyboard.jpg');

/* users table */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    email varchar(100) NOT NULL
);