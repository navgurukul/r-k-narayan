const fs = require('fs');

var knexfile = require('../knexfile.js');
const d_level = require('../utility/d_level')
var knex = require('knex')(knexfile.development);

const tableName ='vb_words';

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
fs.readFile('tagged_words.txt', function (err, data) {
    if (err) throw err;
    let tagged_word = data.toString().split("\n")
    let rows=[];
  
    for (let i = 0; i < tagged_word.length; i++) {
      const each_element = tagged_word[i];
      let word = each_element.split(',');
      let each_word = word[0];
      let level= d_level.calcDiff(each_word)
      let word_type = word[1].trim();
      rows.push({"word": each_word, "word_type":word_type , "d_level" :level})
    }
    callPromises(rows);

});

