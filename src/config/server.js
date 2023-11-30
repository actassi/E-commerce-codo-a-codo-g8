const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el paquete CORS
const authMiddleware = require('../middleware/authMiddleware'); // Ajusta la ruta según la ubicación de tu archivo


const productosRoutes = require('../routes/productosRutas'); // Importa las rutas de productos

const carritosRoutes = require('../routes/carritosRutas'); // Importa la rutas de carritos
const carritoElementosRoutes = require('../routes/carritoElementosRutas'); // Importa la rutas de carritoElementos
const ventasRoutes = require('../routes/ventasRutas'); //Importa las rutas de ventas
const authRoutes = require('../routes/usuarioRutas');
const mainRoutes = require('../routes/mainRutas');

//app.use(cors({origin: '*'}));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Rutas que requieren autenticación con token
//app.use('/api/productos', authMiddleware);
app.use('/api/productos', productosRoutes);

//app.use('/api/carritos',authMiddleware);
app.use('/carritos', carritosRoutes);
//app.use('/api/carrito-elementos',authMiddleware);
app.use('/api/carrito-elementos', carritoElementosRoutes);

//app.use('/api/ventas',authMiddleware);
app.use('/api/ventas', ventasRoutes);

app.use('/api/users', authRoutes);

app.use('/api/', mainRoutes);

app.set('port', port);

/*
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
*/
module.exports = app; // Exporta la instancia de Express o el servidor configurado
