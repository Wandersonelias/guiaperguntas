const sequelize = require('sequelize');
const connection = require("../database/database");

const Pergunta = connection.define('pergunta',{
    titulo: {
        type: sequelize.STRING, 
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT, 
        allowNull: false
    }  
});

Pergunta.sync({force: false})
.then(()=>{
    console.log("Tabela criada com sucesso!");
}).catch(()=>{
    console.log("Erro");
});


module.exports = Pergunta;