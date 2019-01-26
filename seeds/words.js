
exports.seed = function seed(knex, Promise) {

  var tableName = 'vb_words';

  var rows = [
    {
      word: 'you',
      e_meaning: 'you',
      h_meaning: 'तुम',
    },

  ];

  return knex(tableName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tableName);
    });

};