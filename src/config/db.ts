import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**.*.ts'],
    dialectOptions: {
        ssl: {
            require: true,
          rejectUnauthorized: false // Si necesitas deshabilitar la verificación de certificado
        }
    },
    logging: false
})

export default db

