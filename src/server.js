'use strict';

const Hapi = require('hapi');
import routes from './routes'

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');


const init = async () => {
    const server = new Hapi.Server({ port: 8080 });
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation'
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();