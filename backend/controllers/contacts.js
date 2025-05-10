const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    try {
        const db = mongodb.getDb(); 
        const result = await db.collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDb(); 
        const result = await db.collection('contacts').find({ _id: contactId }); 
        const contacts = await result.toArray();

        if (contacts.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};


module.exports = {
    getContacts,
    getContactById
};