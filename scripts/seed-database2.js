const fs = require('fs');
const d_level = require('../utility/d_level')
var knexfile = require('../knexfile.js');
var knex = require('knex')(knexfile.development);

const tableName = 'vb_words';


fs.readFile('en-hi-dict-sen.txt', function (err, data) {
  if (err) throw err;
  let words = data.toString().split("\n")
  let rows = [];
  for (let i = 0; i < words.length; i++) {
    const element = words[i];
    let e_h_words = element.split(',');
    //console.log e_h_words)
    let h_word = e_h_words[0]
    let e_word = e_h_words[1]
    let level= d_level.calcDiff(e_word)

    rows.push({ "word": e_word, "h_meaning": h_word ,"d_level" :level})
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
