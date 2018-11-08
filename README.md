# Bamazon

## This application uses Node and MySQL to do various tasks based on which part of the application you run.

------------

## The first option is to run bamazon from a customer view.

--------
####Upon running this application (node bamazonCustomer.js), the products in your inventory will be displayed in the console in a table showing Item ID, Product Name, Department, Price and Quantity. These values are retrieved through a MySQL server.


-----------
##### This is an example of what will display on the load screen. 

![Load Screen](assets\customer1.png)


#### The customer will than be asked the ID of the item they would like to purchase, as well as how many they would like to purchase.

----

##### Here is an example of a successful transaction. If the quantity requested is less than the available quantity, the transaction will process, and then will thank the customer for their purchase, and give them a final receipt of their transaction

![Successfull Transaction](assets\customer2.png)

-----

#### If the requested quantity is greater then the quantity on hand it will notify the customer

![insufficient Quantity](assets\customer3.png)

------

-----

## Bamazon Manager

#### If instead you would like to use this appliaction as a manager to update quantities, add products, and view low inventory you must run the bamazonManager.js application.

------

###First you will be prompted to make a choice on which action you would like to perform.

![Manager Choice](assets\manager1.png)

#### If view products is selected it will run the same function that is run in the Customer view to show available inventory.


----

#### If you select view low quantity then it will query my database looking for any items with less then 10 quantity and will display that list.

![Low Inventory](assets\manager2.png)

##### It will then ask if you would like to adjust the inventory which would trigger a function that is also used for the next manager choice, Add to Inventory.

------

#### As stated above, the Add to Inventory option on the main screen is the same option that displays once you view low inventory.

#### This option will Than ask the user to define which item's quantity should be affected, as well as how many units the manager would like to add. If this product exists in the databse the quantity will be updated in the database and the adjusted inventory displays again.

![Add Inventory](assets\manager3.png)

---

### Lastly you have the option to add an item to the inventory. If this option is selected It will ask for the new items name, department, price, and quantity, and will push the new item into the databse and display the new inventory. Note that the new item of bike was added to the bottom of the inventory.

![Add Item](assets\manager4.png)




