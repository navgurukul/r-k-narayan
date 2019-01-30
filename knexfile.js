'use strict';
require('dotenv').config()
module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {

            host: process.env.MYSQL_HOST || 'localhost',

            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,

            database: process.env.MYSQL_DB_NAME,
            charset: 'utf8',
            pool: { 
                min: 1000,
                max: 100000 ,
                acquireTimeout: 30*10000,
            },




        }

    }

};
