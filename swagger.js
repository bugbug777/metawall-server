const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Metawall',
    description: 'Metawall RESTful API Docs.',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  tags: [
    {
      name: '使用者',
      description: '端點'
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);