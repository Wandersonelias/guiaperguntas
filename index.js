const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//Banco de dados
require('./database/database');
const PerguntaModel = require('./model/pergunta');
const RespostaModel = require('./model/resposta'); 


//Configurador do engine ejs
app.set('view engine','ejs');
//app.use(express.static("public"));
app.use('/public', express.static('public'));
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
//Rota para detalhamento de perguntas
app.get("/pergunta/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    PerguntaModel.findOne({
        where: {id: id}
    }).then((pergunta)=>{
        if(pergunta != undefined){
            RespostaModel.findAll({
                where: {perguntaId: id},
                order: [['id','DESC']]
            }).then((resposta)=>{
                res.render("pergunta",{pergunta: pergunta, resposta: resposta});
            });
        
        }else{
            res.redirect("/");
        }
    });

    

   
});

app.post("/responder",(req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });

});


app.listen(3000,()=>{
    console.log("Server on");
});