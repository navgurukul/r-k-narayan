require('dotenv').config()

const knex= require('knex')({
    client: 'mysql',
    debug: false,
    connection: {
        host: process.env.RKN_MYSQL_HOST || 'localhost',
        user: process.env.RKN_MYSQL_USER,
        password: process.env.RKN_MYSQL_PASSWORD,
        database: process.env.RKN_MYSQL_DB_NAME,
        charset: 'utf8',
        pool: { 
            min: 1000, 
            max: 1000000 ,
            acquireTimeout: 30*10000,
        },


    }
});
module.exports = knex