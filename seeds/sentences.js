const async = require('async');
const fs = require('fs');
var _ = require('lodash')
exports.seed = function seed(knex, Promise) {

  const tableName = 'sentences';

  let rows = [];
  fs.readFile('hin.txt', function (err, data) {
    if (err) throw err;
    // console.log(data.toString())
    let sentences = data.toString().split("\n")
    for (let i = 0; i < sentences.length; i++) {
      const element = sentences[i];
      let e_h_sentences = element.split(/\t/g);
      let e_sentence = e_h_sentences[0]
      let h_sentence = e_h_sentences[1]
      rows.push({ "sentence": e_sentence, "h_translation": h_sentence })
    }

    const promises = rows.map((row) => {
      knex(tableName).insert(row)
    });
    return Promise.all(promises);
  });
}