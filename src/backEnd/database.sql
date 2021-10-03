CREATE DATABASE pern_ecommerce_app;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER,
    image VARCHAR(100)
    /*TODO: add description*/
);

/* insert mock data */
INSERT INTO products(price, image)
VALUES('laptop', 100000, './resources/laptop.jpg'),
VALUES('mouse', 1000, './resources/mouse.jpg'),
VALUES('keyboard', 3000, './resources/keyboard.jpg');