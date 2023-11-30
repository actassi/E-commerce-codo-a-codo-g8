const express = require('express');
const router = express.Router();
const authController = require('../controllers/authFuncionesController');

router.get('/check-admin-exists', authController.checkAdminExists);
router.get('/create-default-admin', authController.createDefaultAdmin);
router.post('/login', authController.login);

module.exports = router;
