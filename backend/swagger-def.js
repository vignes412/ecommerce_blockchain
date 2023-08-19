const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js']; // Path to the API route files

swaggerAutogen(outputFile, endpointsFiles);