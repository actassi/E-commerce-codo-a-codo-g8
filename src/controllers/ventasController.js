const Venta = require('../models/ventasModel');
const Producto = require ('../controllers/productosController');
const Carritos = require('../models/carritosModel'); // Asegúrate de ajustar la ruta según tu estructura de carpetas y configuración
//const Carritos = require ('../controllers/carritosController');
const sequelize = require('../config/sequelize');

const VentasController = {
  getAllVentas: async () => {
    try {
      return await Venta.findAll();
    } catch (error) {
      throw error;
    }
  },

  addVenta: async (ventaData) => {
    //console.log('ATENCION!!!!!!!!!!!!!!!!!!!!' + JSON.stringify(ventaData, null, 2));
    try {
      return await Venta.create(ventaData);
    } catch (error) {
      throw error;
    }
  },

  editVenta: async (ventaData) => {
    try {
      const venta = await Venta.findByPk(ventaData.id_venta);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }
      await venta.update(ventaData);
    } catch (error) {
      throw error;
    }
  },

  getVenta: async (ventaId) => {
    try {
      return await Venta.findByPk(ventaId);
    } catch (error) {
      throw error;
    }
  },

  deleteVenta: async (ventaId) => {
    try {
      const venta = await Venta.findByPk(ventaId);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }
      await venta.destroy();
    } catch (error) {
      throw error;
    }
  },

  completeVenta: async (ventaData) => {
    console.log('COMPLETEVENTA*****************************************');
    const t = await sequelize.transaction(); // Inicia una transacción
    try {
      // Inicializar un array para almacenar las ventas
      const ventas = [];
  
      // Iterar sobre cada producto en la venta
      for (const productoVenta of ventaData.productos) {
        // Insertar una nueva venta en la tabla de ventas
        const venta = await Venta.create({
          fecha_venta: ventaData.fecha_compra,
          id_cliente: ventaData.id_cliente,
          id_producto: productoVenta.id_producto,
          cantidad_vendida: productoVenta.cantidad_vendida,
          precio_unitario: productoVenta.precio_unitario,
          total_venta: productoVenta.cantidad_vendida * productoVenta.precio_unitario,
          metodo_pago: ventaData.metodo_pago,
          id_usuario: ventaData.id_usuario,
          descuento: ventaData.descuento,
          impuestos: ventaData.impuestos,
          notas: ventaData.notas,
        }, { transaction: t });
  
        // Agregar la venta al array de ventas
        ventas.push(venta);
  
        // Actualizar el stock de productos en la tabla de productos
        const producto = await Producto.getProduct(productoVenta.id_producto);
        if (!producto) {
          throw new Error('Producto no encontrado');
        }
  
        await producto.update(
          { stock: producto.stock - productoVenta.cantidad_vendida },
          { transaction: t }
        );
      }
  
      // Actualizar el estado del carrito en la tabla de carritos
      const carrito = await Carritos.findOne({
        where: {
          id_cliente: ventaData.id_cliente,
          estado_carrito: 'activo',
        },
      });

      
  
      if (!carrito) {
        throw new Error('Carrito no encontrado');
      }
  
      await carrito.update({ estado_carrito: 'completado' }, { transaction: t });
  
      await t.commit(); // Confirma la transacción
  
      // Devuelve los ID de las ventas creadas
      return ventas.map(venta => venta.id_venta);
    } catch (error) {
      await t.rollback(); // En caso de error, realiza un rollback para deshacer cambios
      throw error;
    }
  },
  
  
};

module.exports = VentasController;

