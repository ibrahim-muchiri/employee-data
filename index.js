const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();

//middleware(body-parser)
app.use(express.json());
app.use(cors());


dotenv.config({path: './config.env'});

const db = mysql.createConnection({
    user: "root",
    hosts: "127.0.0.1",
    password: process.env.PASSWORD,
    // port: "8000",
    database: "dataschema",   
});

app.post("/create", (req, res)=>{
    // console.log(req.body);
    const {name} = req.body;
    const {age} = req.body;
    const {country} = req.body;
    const {position} = req.body;    
    const {wage} = req.body;  
    
    db.query("INSERT INTO new_table(name, age, country, position, wage) VALUE(?, ?, ?, ?, ?)",
     [name, age, country, position, wage]), 
    (err, result) =>{
        if(err){
            console.log(err);
        } else {
            res.send("Value inserted");
        }
    }
});

app.get("/employees", (req, res)=>{
    db.query("SELECT * FROM new_table", (err, result) =>{
        if(err) {
            console.log(err)
        } else{
            res.send(result);
        }
    })
});

//export const getProductById = 
app.get("/employees/:id", async (req, res) => {
    try {
        const employee = await new_table.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(employee[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
});
 

//export const updateProduct = async

 app.patch("/edit/:id", async(req, res) => {
    try {
        await new_table.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Employee Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
});

app.delete("/delete/:id", (req, res) =>{
    const {id} = req.params;
    db.query("DELETE FROM new_table WHERE id = ?", id, (err, result)=> {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.put("/update", (req, res)=>{
    const {id} = req.body;
    const {wage} = req.body;
    db.query("UPDATE new_table SET wage = ? WHERE id = ?", [wage, id],
     (err, result) =>{
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
     });
});

const port = process.env.PORT;
app.listen(port, '127.0.0.1', ()=>{
    console.log(`server Listening on port ${port}...`);
    db.connect(function(err){
       if(err){
        console.log(err);
       }
       console.log('Database connected successfully!');
    })
})
