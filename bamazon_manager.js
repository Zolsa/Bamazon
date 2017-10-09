var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var itemIDArray = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runProgram();
});

var runProgram = function() {
	inquirer.prompt({
		name: 'action',
		type: 'list',
		choices: [
			'Display inventory',
			'Display low inventory',
			'Add to inventory',
			'Add a new product'
		]

	}). then(function(answer) {
		switch(answer.action) {
			case 'Display inventory':
				displayProducts();
				break;
			case 'Display low inventory':
				displayLowInventory();
				break;
			case 'Add to inventory':
				addToInventory();
				break;
			case 'Add a new product':
				addNewProduct();
				break;
		}

	});
};

var displayProducts = function() {
	var itemList = [];
	console.log('Department Item        Cost');
	connection.query("SELECT * FROM Products", function(err, res) {	
		for(var i = 0; i < res.length; i++) {
			itemList.push(res[i]);
			//console.log(res[i].item_id + ') ' + res[i].department_name + ' - ' + res[i].product_name + ' - ' + res[i].price);
			itemIDArray.push(res[i].item_id);
		}
		console.log('\n')
		console.table(itemList);
	});
};

var displayLowInventory = function() {
	var itemList = [];
	connection.query("SELECT * FROM Products WHERE quantity <= 5", function(err, res) {
		for(var i = 0, i < res.length, i++) {
			itemList.push(res[i]);
		}
		console.log('\n');
		console.table(itemList);
	}
};

var addToInventory = function(selectedItem, amount) {
	var query = "SELECT * FROM Products WHERE ?";
	connection.query(query, {item_id: selectedItem}, function(err, res) {
		// console.log(res[0].quantity);
		if(err) {throw err;}		
		var query = "UPDATE Products SET quantity = " + (res[0].quantity + amount) + " WHERE item_id = " + selectedItem;
		connection.query(query, function (err, result) {
		    if (err) {throw err;}    
		    console.log('Successfully updated');
		});				
	});			
};

var addProduct = function(name, department, price, quantity) {
	connection.query("INSERT into Products SET ?",
		{
			item_id: int auto_increment not null,
			product_name: name,
			department_name: department,
			price: price,
			quantity: quantity,
			primary key: (item_id)
		}, function(err) {
			if(err) {throw err;}
			console.log('Product added');
	});
};