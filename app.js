//import db from './src/config/db'; // Importa la configuración de la base de datos
const server = require('./src/config/server'); // Importa la configuración del servidor

// Iniciar el servidor
const port = server.get('port');
server.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
