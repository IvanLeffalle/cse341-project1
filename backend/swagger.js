const swaggerAutgen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts application',
    },
    host: 'https://project1-rxlf.onrender.com',
    schemes: ['https','http'],
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutgen(outputFile, endpointsFiles, doc);