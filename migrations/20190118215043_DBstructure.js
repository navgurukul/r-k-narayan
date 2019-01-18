
exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema
			.createTableIfNotExists('words', function (wordsTable) {
				// primary Key
				wordsTable.increments('id').primary()
				// data
				wordsTable.string('word', 50).notNullable()
				wordsTable.string('e_meaning', 50).notNullable()
				wordsTable.string('h_meaning', 250).notNullable()

				wordsTable.string('guid', 50).notNullable().unique()

			})
			.createTableIfNotExists('sentences', function (sentencesTable) {
				// primary Key
				sentencesTable.increments('id').primary()

				//data
				wordsTable.string('sentence').notNullable()
				wordsTable.string('h_translation').notNullable()
			})
	]);

};

exports.down = function (knex, Promise) {
	return Promise.all([
		//remember to drop a refrencing table first
		knex
			.schema
			.dropTableIfExists('sentences')
			.dropTableIfExists('words')
	]);

};
