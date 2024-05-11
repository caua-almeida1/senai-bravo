import Sequelize from "sequelize";
import 'dotenv/config'


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {

    host: process.env.DB_HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
.then(function(){
    console.log('Meu banco de dados está conectado com sucesso');
}).catch (function() {
    console.error('Servidor não conectou');
})


export default sequelize