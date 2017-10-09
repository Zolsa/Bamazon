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
	displayInventory();
	setTimeout(initialPrompt, 500);
};

var displayInventory = function() {
	var itemList = [];
	console.log('Department Item        Cost');
	connection.query("SELECT * FROM Products", function(err, res) {	
		for(var i = 0; i<res.length; i++) {
			itemList.push(res[i]);
			//console.log(res[i].item_id + ') ' + res[i].department_name + ' - ' + res[i].product_name + ' - ' + res[i].price);
			itemIDArray.push(res[i].item_id);
		}
		console.log('\n')
		console.table(itemList);
	});
};

var updateQuery = function(selectedItem, quantitySelected) {
	var query = "SELECT * FROM Products WHERE ?";
	connection.query(query, {item_id: selectedItem}, function(err, res) {
		// console.log(res[0].quantity);
		if(err) {throw err;}
		if(quantitySelected <= res[0].quantity) {			
			var query = "UPDATE Products SET quantity = " + (res[0].quantity - quantitySelected) + " WHERE item_id = " + selectedItem;
			connection.query(query, function (err, result) {
			    if (err) {throw err;}    
			    console.log('Your total cost is ' + res[0].price * quantitySelected);
			});
		} else {
			console.log('We only have ' + res[0].quantity + ' left');
		}				
	});
	setTimeout(function(){process.exit();}, 2500);	
};

var getQuantity = function(selectedItem) {
    var query = "SELECT quantity FROM Products WHERE ?";
	connection.query(query, {item_id: selectedItem}, function(err, res) {
		if(err) {throw err;}
		return res[0].quantity;				
	});
};



var initialPrompt = function() {
	inquirer.prompt([
		{
			name: 'id',
			type: 'input',
			message: 'Which item would you like to purchase?'
			// validate: function(value) {
	  //         if (isNaN(value) === false && value >= 1 && value <= itemIDArray.length) {
	  //             return true;
	  //         } else {
		 //          console.log('Please choose one of the item numbers listed');
		 //          return false;
	  //         }
	  //       }
        },
		{
			name: 'quantity',
			type: 'input',
			message: 'How many do you want?',
			// validate: function(value) {
	  //         if (isNaN(value) === false) {
	  //             return true;
	  //         } else {
	  //             return false;
	  //         }
	  //       }
		}
	]).then(function(answer) {
		var selectedItem = answer.id;
		var quantitySelected = answer.quantity;
		updateQuery(selectedItem, quantitySelected);



  		


	});
};