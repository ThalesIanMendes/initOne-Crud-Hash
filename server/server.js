require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
server.use(express.json());
server.use(cors());

//add variaveis.env file in that folder 
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});

server.post('/register', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }if(result.length == 0){
            bcrypt.hash(password, saltRounds, (erro, hash) => {
                db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if(err){
                        res.send(err);
                    }
                    res.send({msg: "Cadastrado com sucesso!"});
                });
            });
        }else{
            res.send({msg: "Usuario já cadastrado"});
        }
    });
});

server.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            req.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (erro, result) =>{
                if(result){
                    res.send({msg: "Usuario logado com sucesso!"});
                }else{
                    res.send({msg: "Senha incorreta!"});
                }
            }); 
        }else{
            res.send({msg: "Login ou senha incorretos!"});
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`)
}); 