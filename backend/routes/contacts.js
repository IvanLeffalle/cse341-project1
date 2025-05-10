const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getContactById);

module.exports = router;