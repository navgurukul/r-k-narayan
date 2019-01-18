
exports.seed = function seed(knex, Promise) {

  var tableName = 'sentences';

  var rows = [
    {
      sentence: 'Come home early.',
      h_translation: 'जल्दी घर आजाओ।'
    },

  ];

  return knex(tableName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tableName);
    });

};