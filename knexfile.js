'use strict';
require('dotenv').config()
module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {

            host: process.env.RKN_MYSQL_HOST || 'localhost',
            user: process.env.RKN_MYSQL_USER,
            password: process.env.RKN_MYSQL_PASSWORD,
            database: process.env.RKN_MYSQL_DB_NAME,
            
            charset: 'utf8',
            pool: { 
                min: 1000,
                max: 100000 ,
                acquireTimeout: 30*10000,
            },




        }

    }

};
