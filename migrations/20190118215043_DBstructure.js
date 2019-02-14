
exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema
			.createTableIfNotExists('vb_words', function (wordsTable) {
				// primary Key
				wordsTable.increments('id').primary()
				// data
				wordsTable.string('word', 250).notNullable()
				wordsTable.string('e_meaning', 250).notNullable().defaultTo("")
				wordsTable.string('h_meaning', 250).notNullable().defaultTo("")
				wordsTable.string('word_type', 5).defaultTo("")
				wordsTable.integer('d_level').unsigned().notNullable()


			})
			.createTableIfNotExists('vb_sentences', function (sentencesTable) {
				// primary Key
				sentencesTable.increments('id').primary()

				//data
				sentencesTable.string('sentence').notNullable()
				sentencesTable.string('h_translation').notNullable().defaultTo("")
				sentencesTable.integer('d_level').unsigned().notNullable()

			})

	]);

};

exports.down = function (knex, Promise) {
	return Promise.all([
		//remember to drop a refrencing table first
		knex
			.schema
			.dropTableIfExists('vb_sentences')
			.dropTableIfExists('vb_words')
	]);

};
