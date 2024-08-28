import express from "express";
import colors from 'colors'
import router from './router'
import db from "./config/db";

//Conexion a base de datos
const connectDB = async () => {
    try{
        db.authenticate()
        db.sync()
        console.log(colors.bgGreen.bold('Conexion exitosa a la base de datos'))
    } catch(error) {
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'))
    }
}

connectDB()

const server = express()

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)



export default server