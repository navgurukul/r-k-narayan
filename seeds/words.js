exports.seed = function seed(knex, Promise) {

  var tableName = 'vb_words';

  var rows = [
    {
      word: 'you',
      e_meaning: 'you',
      h_meaning: 'तुम',
    },
    {
      word: 'me',
      e_meaning: 'me',
      h_meaning: 'main',
    },
    {
      word: 'today',
      e_meaning: 'today',
      h_meaning: 'aajtak',
    },
    {
      word: 'tomorrow',
      e_meaning: 'tomorrow',
      h_meaning: 'kaltak',
    },
    {
      word: 'I',
      e_meaning: 'I',
      h_meaning: 'main',
    },
  ]

  return knex(tableName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tableName);
    });

};