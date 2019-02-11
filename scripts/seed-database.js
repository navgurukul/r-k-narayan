const fs = require('fs');
const d_level = require('../utility/d_level')

var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName = 'vb_sentences';


fs.readFile('./hin.txt', function (err, data) {
  if (err) throw err;
  let sentences = data.toString().split("\n")
  let rows = [];

  for (let i = 0; i < sentences.length; i++) {
    const element = sentences[i];
    let e_h_sentences = element.split(/\t/g);
    let e_sentence = e_h_sentences[0]
    let level=d_level.sentenceCalcDiff(e_sentence)
    let h_sentence = e_h_sentences[1]
    rows.push({ "sentence": e_sentence, "h_translation": h_sentence, "d_level":level })
  }

  const promises = rows.map((row) => 
    new Promise((resolve, reject)=> {
        knex(tableName).count('id as a').where({"sentence":row["sentence"]}).then((count)=>{
            if (count[0].a==0) {
                knex(tableName).insert(row).then(() => {
                    resolve("inserted");
                });
            } else {
                resolve("need not insert");
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
