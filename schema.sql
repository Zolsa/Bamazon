Drop database if exists Bamazon;
Create database Bamazon;
use Bamazon;
create table Products(
	item_id int auto_increment not null,
	product_name varchar(50) not null,
	department_name varchar(50) not null,
	price float not null,
	quantity int not null,
	primary key (item_id)	
);

INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Gibson Les Paul", "Guitars", 800, 10);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Fender Stratocaster", "Guitars", 900, 9);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("G&L ASAT Special", "Guitars", 700, 10);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Warwick", "Basses", 1500, 8);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Shechter Gothic", "Basses", 500, 5);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Tobias", "Basses", 2000, 2);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Gretsch", "Drums", 900, 4);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Ludwig", "Drums", 600, 5);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Pearl Forum", "Drums", 300, 12);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Wurlitzer", "Keyboards", 500, 5);
INSERT INTO Products (product_name, department_name, price, quantity)
VALUES ("Nord", "Keyboards", 500, 5);