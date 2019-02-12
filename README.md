# R K Narayan
Learn English Words

# How to SetUp (One time)?
1. npm install (installing all dependencies)
2. npm install -g knex (install knex globally)
3. sudo npm install -g nodemon (install nodemon globally)
4. knex migrate:latest (updates datastructure of database)

# For adding seed data
```bash
   node scripts/seed-database.js
   node scripts/seed-database1.js
   node scripts/seed-database2.js
   node scripts/seed-database3.js
```
We didn't do this in seeds/ folder as the error handling is very poor when we
run the seed scripts.

# How to Run?
  npm start (start server)

# Documentation
When the code is running, documentation is accessible at localhost:8080/documentation.
