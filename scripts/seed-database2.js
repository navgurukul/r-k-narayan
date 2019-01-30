const fs = require('fs');

var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName = 'vb_words';


fs.readFile('en-hi-dict-sen.txt', function (err, data) {
  if (err) throw err;
  let words = data.toString().split("\n")
  let rows = [];
  for (let i = 0; i < words.length; i++) {
    const element = words[i];
    let e_h_sentences = element.split(',');
    //console.log(e_h_sentences)
    let h_word = e_h_sentences[0]
    let e_word = e_h_sentences[1]
    rows.push({ "word": e_word, "h_meaning": h_word })
  }


//   // let delPromise =  knex(tableName).del();
  const promises = rows.map((row) => {
        fn = (resolve, reject)=> {
            knex(tableName).count('id as a').where({"word":row["word"]}).then((count)=>{
                if (count[0].a==0) {
                    knex(tableName).insert(row).then(() => {
                        resolve("inserted");
                    });
                } else {
                    resolve("need not insert");
                }
            })
        };
        return new Promise(fn);
    }
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
