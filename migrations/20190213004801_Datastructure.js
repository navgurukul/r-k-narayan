
exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema
			.createTableIfNotExists('vb_user_preferences', function (userTable) {
				// primary Key
				userTable.increments('id').primary()

				//data
				userTable.string('email_id').notNullable().unique()
				userTable.integer('frequency').unsigned().notNullable().defaultTo(1)
				userTable.integer('d_level').unsigned().notNullable().defaultTo(2)

			})
	]);

};

exports.down = function (knex, Promise) {
	return Promise.all([
		//remember to drop a refrencing table first
		knex
			.schema
			.dropTableIfExists('vb_user_preferences')
	]);

};
