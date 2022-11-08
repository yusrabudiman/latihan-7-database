import express from 'express';
import mysql2 from 'mysql2';
const app = express();
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db'
})
const hostname = '127.0.0.1';
const port = 7350;

conn.connect(err => {
    if(err){
        console.error("database is disconnect");
        console.error(err);
    }
    else{
        console.log("database is connected!")
    }
});

app.get('/api/customers', (req, res) =>{
    let sql = "SELECT * FROM `customers` WHERE 1;";
    let query = conn.query(sql, (err, results) => {
        res.json(results);
    })
});
app.get('/api/customer/:nama', (req, res) => {
    let sql = "SELECT * FROM `customers` WHERE cust_name = '"+req.params.nama+"' ";
    let query = conn.query(sql, (err, results) => {
        res.json(results);
    })
});

app.get('/api/products', (req, res) =>{
    let sql = "SELECT * FROM `product` WHERE 1;";
    let query = conn.query(sql, (error, results) => {
        res.json({
            "status" : res.statusCode,
            "error" : error,
            "response" : results
        });
    })
});

app.get('/api/product/:nama', (req, res) =>{
    let sql = "SELECT * FROM `product` WHERE product_id = '"+req.params.nama+"' ";
    let query = conn.query(sql, (error, results) => {
        res.json({
            "status" : res.statusCode,
            "error" : error,
            "response" : results
        });
    })
});

app.listen(port, () =>{
    console.log(`Server json Running at ${hostname}:${port}`);
});