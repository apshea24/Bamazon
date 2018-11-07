const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,

    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    initialInquiry()
});


function initialInquiry() {
    inquirer
        .prompt([
            {
                name: "menuChoice",
                type: "list",
                message: "What action would you like to perform?",
                choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            },
        ]).then(function (user) {
            if (user.menuChoice === "View Products For Sale") {
                productView();
            } else if (user.menuChoice === "View Low Inventory") {
                lowInventory()
            } else if (user.menuChoice === "Add to Inventory") {
                addInventory()
            } else {
                addProduct()
            }

        });
};

let itemsArr = [];
let itemsArr2 = [];

function productView() {

    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                let table = res[i];
                let quantity = res[i].stock_quantity;
                itemsArr.push(table)
                let test = JSON.stringify(res[i]);

            };

            console.table("Current Inventory", itemsArr);
            // customerRun()
        }
    );

};

function addInventory() {
    inquirer.prompt([
        {
            name: "productChoice",
            type: "input",
            message: "What Item's Inventory would you like to change?"
        },
        {
            name: "newQuantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ]).then(function (user) {
        let choice = user.productChoice;
        let quantity = user.newQuantity;
        let query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: quantity,
                },
                {
                    product_name: choice
                }
            ],
            function (err, res) {
                console.log("---------------------\n")
                console.log(res.affectedRows + " products updated!\n")
                productView();
            }
        );

    });
};


function addProduct() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Item would you like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does this item belong in?"
        },
        {
            name: "price",
            type: "input",
            message: "What is this item's price?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ]).then(function (user) {
        console.log("Adding a new Product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: user.name,
                department_name: user.department,
                price: user.price,
                stock_quantity: user.quantity
            }
        );
        console.log(chalk.red("You added " + user.name + " to our inventory!!\n"))
        productView();
    });
};

function lowInventory() {
    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                let table = res[i];
                let quantity = table.stock_quantity;
                if (quantity < 10) {
                    itemsArr2.push(table)
                };

            };

            console.table("Low Inventory", itemsArr2);
            
            inquirer.prompt({
                name: "addInventory",
                type: "list",
                message: "Would you like to adjust inventory?",
                choices: ["Yes", "No"]
            }).then(function(user) {
                if (user.addInventory === "Yes") {
                    addInventory();
                };
            })
        }
    );
};
