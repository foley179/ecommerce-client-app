CREATE DATABASE pern_ecommerce_app;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    image VARCHAR(100)
    /*TODO: add description*/
);