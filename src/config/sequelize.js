
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  //port: 3307,
  username: 'root',
  password: 'Mysql908',
  database: 'funko',
  define: {
    timestamps: false, // Si no deseas las columnas createdAt y updatedAt
  },
});

// Verificar la conexión a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
