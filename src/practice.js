const knex = require("knex");
require("dotenv").config();

const knexInstance = knex({
    client: "pg",
    connection: process.env.DB_URL
    // connection: "postgresql://dsonn@localhost/knex-practice"
});

// const query1 = knexInstance
//     .select("column_names")
//     .from("amazong_products")
//     .where("product_id", ">", 28);
// console.log(query1);

// knexInstance
//     .select("column_names")
//     .from("amazong_products")
//     .where("product_id", ">", 28)
//     .debug()
//     .then(results => console.log(results));

// // with password
// // connection: 'postgresql://dunder-mifflin:password-here@localhost/knex-practice',

// // all the same!
// knexInstance
//     .select("column_names")
//     .from("amazong_products")
//     .where("product_id", 28)
//     .where("product_id", "=", 28)
//     .where({ product_id: 28 });

// QUESTION 1: GET ALL ITEMS THAT CONTAIN TEXT

function searchTerm(term) {
    let lowerTerm = term.toLowerCase();
    const query = knexInstance
        .select("*")
        .from("shopping_list")
        .where("name", "ILIKE", `%${term}%`);
    let results = query.then(results => console.log(results));
    let sql = query.toString();
    console.log(sql);
}

// searchTerm("fish");

// QUESTION 2: CREATE PAGINATION WITH LIMIT AND OFFSET

function pages(pageNumber) {
    const itemLimit = 6;
    let page = pageNumber * itemLimit - itemLimit;

    const query = knexInstance
        .select("*")
        .from("shopping_list")
        .limit(itemLimit)
        .offset(page);
    let results = query.then(results => console.log(results));
    let sql = query.toString();
    console.log(sql);
}

// pages(2);

// QUESTION 3: GET ALL ITEMS ADDED AFTER DATE

function after(daysAgo) {
    const date = new Date();
    date.setDate(date.getUTCDate() - daysAgo);
    console.log(date);

    const query = knexInstance
        .select("*")
        .from("shopping_list")
        .where("date_added", ">", date);
    let results = query.then(results => console.log(results));
    let sql = query.toString();
    console.log(sql);
}

// after(2);

// QUESTION 4: TOTAL COST

function totalCost() {
    const query = knexInstance
        .select("category")
        .sum("price")
        .from("shopping_list")
        .groupBy("category");
    let results = query.then(results => console.log(results));
    let sql = query.toString();
    console.log(sql);
}

totalCost();
