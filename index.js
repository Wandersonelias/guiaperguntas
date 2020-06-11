const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//Banco de dados
require('./database/database');
const PerguntaModel = require('./model/pergunta'); 


//Configurador do engine ejs
app.set('view engine','ejs');
app.use(express.static('public'));
//Configurações para parametros JSON e Normais
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
   PerguntaModel.findAll({
       order:[ ['id','DESC']]
   }).then((perguntas) =>{
       res.render("index",{perguntas: perguntas}); 
   });

});
//router perguntar
app.get('/perguntar',(req,res)=>{
    res.render("perguntar");
});
app.post('/salvar',(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
    
});

app.listen(3000,()=>{
    console.log("Server on");
});