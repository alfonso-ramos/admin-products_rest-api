import express from "express";
import router from './router'
import db from "./config/db";

//Conexion a base de datos
const connectDB = async () => {
    try{
        db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la base de datos')
    } catch(error) {
        console.error(error)
        console.log('Hubo un error al conectar a la base de datos')
    }
}
connectDB()
const server = express()
server.use('/api/products', router)



export default server