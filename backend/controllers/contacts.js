const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res) => {
    //#Swagger.tags=["Contacts"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("contacts").find();
    const contacts = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

const getContactById = async (req, res) => {
    //#Swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb();
    const result = await db.collection("contacts").find({ _id: contactId });
    const contacts = await result.toArray();

    if (contacts.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

const createContact = async (req, res) => {
    //#Swagger.tags=["Contacts"]
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const db = mongodb.getDb();
  const result = await db.collection("contacts").insertOne(newContact);
  if (result.acknowledged) {
    res.status(201).json({ message: "Contact created" });
  } else {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

const updateContact = async (req, res) => {
    //#Swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const db = mongodb.getDb();
  const result = await db
    .collection("contacts")
    .replaceOne({ _id: contactId }, newContact);
  if (result.modifiedCount > 0) {
    res.status(201).json({ message: "Contact updated" });
  } else {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

const deleteContact = async (req, res) => {
    //#Swagger.tags=["Contacts"]
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.status(201).json({ message: "Contact deleted" });
    } else {
      res.status(500).json({ error: "Failed to create contact" });
    }
  };
module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
