CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products ("Logitech Keyboard", "Electronics", 14.51, 28), ("Connect Four", "Board Games", 7.49, 62), ("Amazon Echo Dot", "Electronics", 29.99, 14), ("Besiva iPhone Cable (5 pack)", "Electronics", 11.81, 195), ("Signed Larry Fitzgerald Jersey", "Sports Memorabelia", 449.99, 1), ("1st Edition Holographic Charizard Pokemon Card", "Collectables", 139.99, 6), ("Game of Thrones Box Set", "Electronics", 240.00, 38), ("Two Twin Tabby Cats", "Dumb-Cats Department", 22.22, 1), 