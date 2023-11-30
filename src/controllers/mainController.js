const MainModel = require('../models/mainModel');

const MainController = {
  getHome: async () => {
    try {
      return await MainModel.getHome();
    } catch (error) {
      throw error;
    }
  },

  getContact: async () => {
    try {
      return await MainModel.getContact();
    } catch (error) {
      throw error;
    }
  },

  getAbout: async () => {
    try {
      return await MainModel.getAbout();
    } catch (error) {
      throw error;
    }
  },

  getFaqs: async () => {
    try {
      return await MainModel.getFaqs();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = MainController;
