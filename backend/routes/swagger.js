const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('../swagger_output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerJsDoc));

module.exports = router;