const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
        return callback(null, _db);
    }
    mongodb.connect(process.env.DB_CONNECTION_STRING)
        .then(client => {
            _db = client.db();
            return callback(null, _db);
        })
        .catch(err => {
            return callback(err);
        });
};

const getDb = () => {
    if (!_db) {
      throw Error('Database not initialized!');
    }
    return _db; 
  };

const getCollection = (contacts) => {
    if (_db) {
        return _db.collection(contacts);
    }
    throw new Error('Database not initialized. Call initDb first.');
};
const closeDb = () => {
    if (_db) {
        _db.close();
        _db = null;
    }
};


module.exports = {
    initDb,
    getDb,
    getCollection,
    closeDb
};