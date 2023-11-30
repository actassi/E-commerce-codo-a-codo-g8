const CarritoElementosModel = require('../models/carritoElementosModel');
const CarritoElementosFunctions = require('../functions/carritoElementosFunctions');


const CarritoElementosController = {
  addProductToCart: async (carritoId, productoId, cantidad, precioUnitario) => {
    try {
      return await CarritoElementosModel.addProductToCart(carritoId, productoId, cantidad, precioUnitario);
    } catch (error) {
      throw error;
    }
  },

  updateProductQuantity: async (elementoId, nuevaCantidad) => {
    try {
      return await CarritoElementosModel.updateProductQuantity(elementoId, nuevaCantidad);
    } catch (error) {
      throw error;
    }
  },

  updateProductPrice: async (elementoId, nuevoPrecio) => {
    try {
      return await CarritoElementosModel.updateProductPrice(elementoId, nuevoPrecio);
    } catch (error) {
      throw error;
    }
  },

  getCartItems: async (carritoId) => {
    try {
      return await CarritoElementosModel.getCartItems(carritoId);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = CarritoElementosController;
