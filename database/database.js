const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','wanderson','regina',{
    host: 'localhost',
    dialect: 'mysql'
});

connection.authenticate()
.then(()=>{
    console.log("Conexão estabelecida com sucesso!");
}).catch((err)=>{
    console.log("Erro: " +  err);
});


module.exports = connection;