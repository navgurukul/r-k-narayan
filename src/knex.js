require('dotenv').config()

export default require('knex')({
    client: 'mysql',
    "debug": false,
    connection: {
        host: 'localhost',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        charset: 'utf8',
    }
});