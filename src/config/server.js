const express = require('express');
const app = express();

const cors = require('cors'); // Importa el paquete CORS
const authMiddleware = require('../middleware/authMiddleware'); // Ajusta la ruta según la ubicación de tu archivo


const productosRoutes = require('../routes/productosRutas'); // Importa las rutas de productos
const carritosRoutes = require('../routes/carritosRutas'); // Importa la rutas de carritos
const carritoElementosRoutes = require('../routes/carritoElementosRutas'); // Importa la rutas de carritoElementos
const ventasRoutes = require('../routes/ventasRutas'); //Importa las rutas de ventas
const authRoutes = require('../routes/usuarioRutas');
const mainRoutes = require('../routes/mainRutas');

const dotenv = require ('dotenv');

import bodyParser from 'body-parser';
import path from 'path';

/*
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
*/

// Carga las variables de entorno para el server
dotenv.config({ path: '.env.server' });
const port = process.env.SERVER_PORT;



app.use(cors());
// Configura express.static para servir archivos estáticos desde la carpeta 'public'
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());

// Rutas que requieren autenticación con token
app.use('/api/productos', productosRoutes);
app.use('/carritos', carritosRoutes);
app.use('/api/carrito-elementos', carritoElementosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/users', authRoutes);
app.use('/api/', mainRoutes);

app.set('port', port);

// Configuración body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default app; // Exporta la instancia de Express o el servidor configurado
