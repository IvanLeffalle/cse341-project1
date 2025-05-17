const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const mongodb = require('./data/database.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((res,req, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE','OPTIONS');
    res.header('Access-Control-Allow-Headers','Origins','X-Requested-With', 'Content-Type', 'Accept', 'Z-Key');
    next();
});

app.use('/',require('./routes/index.js'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => { 
            console.log(`Database is listening and Node is running on http://localhost:${port}`)
    })
    }
});