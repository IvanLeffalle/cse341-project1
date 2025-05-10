const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const mongodb = require('./data/database.js');

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