import sequelize from "./db.js";
import Sequelize, { DataTypes } from "sequelize";


const User = sequelize.define('user',{

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    
    email:{
        type: DataTypes.STRING,
        allowNull:false},

    password:{
        type: DataTypes.STRING,
        allowNull:false
    },

    telefone:{
        type: DataTypes.STRING,
        allowNull:false
    },

    cep:{
        type: DataTypes.STRING,
        allowNull:false
    },

    estado:{
        type: DataTypes.STRING,
        allowNull:false
    },

    cidade:{
        type: DataTypes.STRING,
        allowNull:false
    },

    bairro:{
        type: DataTypes.STRING,
        allowNull:false
    },

    rua:{
        type: DataTypes.STRING,
        allowNull:false
    }
})


User.sync({alter: true})
export default User