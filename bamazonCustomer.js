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
});

loadTable();

function loadTable() {

    let itemsArr = [];

    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                let table = res[i];
                itemsArr.push(table)
                let test = JSON.stringify(res[i]);
                // console.log(test);
                // console.log(table + "31");
                // var values = [
                //     [table.item_id, table.product_name, table.department_name, table.price, table.stock_quantity],
                // ]
                // console.log(table)
                // console.log(itemsArr)
                // console.table([
                //     {
                //         name: table.product_name,
                //     },
                //     {
                //         id: chalk.red(table.item_id),
                //     },
                //     {
                //         department: table.department_name,
                //     },
                //     {
                //         price: table.price,
                //     },
                //     {
                //         quantity: table.stock_quantity,
                //     }
                // ]);
            };

            console.table("Current Inventory", itemsArr);
            customerRun()
        }
    );

};

function customerRun() {
    inquirer
        .prompt([
            {
                name: "choose_id",
                type: "input",
                message: "What is the ID of the Item you would like to purchase?"
            },
            {
                name: "choose_quantity",
                type: "input",
                message: "How many would you like to purchase"
            }
        ]).then(function (user) {
            let id = user.choose_id;
            let quantity = user.choose_quantity;
            quantityCheck(id, quantity)

        });
};

function quantityCheck(id, quantity) {
    let query = connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        if (err) throw err;
        var currentQuantity = res[0].stock_quantity;
        let price = res[0].price;
        let name = res[0].product_name;
        console.log("You would like to purchase " + quantity + " " + name + "!!!\n");
        if (quantity > currentQuantity) {
            console.log("------------------")
            console.log(chalk.red("Insufficient Quantity!!"));
            console.log("-----------------")
        } else {
            //Change quantity and log receipt
            updateQuantity(id, quantity, currentQuantity, price, name)
        };

    });

};

function updateQuantity(item, current, original, price, name) {
    console.log("Processing Transaction...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: original - current
            },
            {
                item_id: item
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " products updated!\n");
            // console.log(res);
            console.log("Thank you for your purchase of " + current + " " + name + "!!!!")
            console.log("------------------\n")
            console.log(chalk.red("Your Total Today is $" + price * current));

            restart();
        }
    );
};

function restart() {
    inquirer.prompt([
        {
            type: "list",
            name: "another_item",
            message: "Would you like to purchase something else?",
            choices: ["Yes", "No"]
        }
    ]).then(function (user) {
        if (user.another_item === "No") {
            connection.end();
            console.log("works")
        } else {
            loadTable()
        }
    })
}