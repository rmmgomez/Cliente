"use strict";

// Create a class "Product" with name and price
// Create an array with at least 4 products
// Order that array by product's name and show it
// Order that array by product's price and show it

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    toString() {
        return `${this.name} (${this.price})`;
    }
}

let products = [
    new Product("chair", 45),
    new Product("table", 100),
    new Product("lamp", 15.95),
    new Product("armchair", 67.5)
];

products.sort((p1, p2) => p1.name.localeCompare(p2.name));
console.log(products.toString());

products.sort((p1, p2) => p1.price - p2.price);
console.log(products.toString());
