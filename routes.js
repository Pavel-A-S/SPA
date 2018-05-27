var express = require('express');
var router = express.Router();

var clientsController = require('./controllers/clients.js');
var providersController = require('./controllers/providers.js');

router.get('/', (req, res) => { res.render('index.pug') });

router.get('/clients', clientsController.index);
router.get('/clients/:id', clientsController.show);
router.post('/clients', clientsController.create);
router.put('/clients/:id', clientsController.update);
router.delete('/clients/:id', clientsController.delete);

router.post('/providers', providersController.create);
router.delete('/providers/:id', providersController.delete);
router.put('/providers/:id', providersController.update);

module.exports = router;
