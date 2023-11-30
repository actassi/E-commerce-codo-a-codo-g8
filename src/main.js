import express from "express";
import dotenv from "dotenv";
import loginRouter from "./src/routes/loginRouter.js";
import registerRouter from "./src/routes/registerRouter.js";
import conn from "./src/config/conn.js"
import bodyParser from "body-parser";
import path from "path";
import cors from 'cors';

import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Configura express.static para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar servidor
const PORT = process.env.PORT || 3000; // Si PORT no está definido en .env, usa el puerto 3000 por defecto
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar el enrutador para manejar las rutas 
app.use(cors());
app.use('/', loginRouter);
app.use('/', registerRouter);




