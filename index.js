const express = require('express');
const app = express();
const path = require('path');

//Configurador do engine ejs
app.set('view engine','ejs');
app.use(express.static('public'));


app.get('/',(req,res)=>{
   res.render("index");
});
//router perguntar
app.get('/perguntar',(req,res)=>{
    res.render("perguntar");
});

app.listen(3000,()=>{
    console.log("Server on");
});