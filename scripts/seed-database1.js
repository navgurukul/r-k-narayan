const fs = require('fs');
require('dotenv').config()


var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName = 'vb_words';

const getPromises = (rows) => {
    return rows.map((row) => 
    new Promise((resolve, reject)=> {
        knex(tableName).count('id as a').where({"word":row["word"]}).then((count)=>{
            if (count[0].a==0) {
                knex(tableName).insert(row)
                .then(() => {
                    resolve("inserted");
                });
            } else {
                resolve("need not insert");
            }
        })
    })
  );
};

const callPromises = (rows) => {
    first_1000_rows = rows.slice(0,1000);
    promises = getPromises(first_1000_rows);
    remaining_rows = rows.slice(1000, rows.length);

    Promise.all(promises)
    .then((data) =>
        {
            console.log("remaining ", remaining_rows.length);

            if (remaining_rows.length === 0)
                process.exit(1);
            else
                callPromises(remaining_rows);
        })
    .catch((error) => {
        console.log(error ,"errrr");
        process.exit();
    });
}

fs.readFile('./en-hi-dict.txt', function (err, data) {
  if (err) throw err;
  let words = data.toString().split("\n")
  let rows = [];

  for (let i = 0; i < words.length; i++) {
    const element = words[i];
    let e_h_words = element.split(",");
    let e_word = e_h_words[1]
    let h_word = e_h_words[0]
    rows.push({ "word": e_word,"e_meaning":e_word, "h_meaning": h_word })
    }

    callPromises(rows);

 });
