const fs = require('fs');

var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName ='vb_words';

fs.readFile('tagged_words.txt', function (err, data) {
    if (err) throw err;
    let tagged_word = data.toString().split("\n")
    let rows=[];
  
    for (let i = 0; i < tagged_word.length; i++) {
      const each_element = tagged_word[i];
      let word = each_element.split(',');
      let each_word = word[0];

      let word_type = word[1].trim();
      rows.push({"word": each_word, "word_type":word_type})
    }

    const promises = rows.map((row) => 
    new Promise((resolve, reject)=> {
        knex(tableName).count('id as a').where({"word":row["word"]}).then((count)=>{
            if (count[0].a==0) {
                knex(tableName).insert(row).then(() => {
                    resolve("inserted");
                });
            } else {
                resolve("need not insert.");
            }
        })
    })
  );
  Promise.all(promises)
    .then((data) =>
        {
            process.exit();
            // console.log(data);
        })
    .catch((error) => {
        console.log(error);
        process.exit();
    });

});

