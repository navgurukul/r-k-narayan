const getInstance = require('./getInstance')
const Boom = require('boom');

module.exports = [
	{
		method: 'GET',
		path: '/get_word_of_the_day',
		config: {
			description: 'get word of the day',
			notes: 'get word of the day',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) => {
				// # level = 0 don't use level
				// # level between 1 to 5
				// # return a word with larger length
				// # 1 - upto 4 characters
				// # 2 - upto 5 chars
				// # 3 - upto 7 chars
				// # 4 - upto 8 chars(higher probability)
				// # 5 - all
				let data = {}
				getInstance.getWordOfTheDay()
					.then((result) => {
						data['newWord'] = result
						return resolve(data)
					})
					.catch((error) => {
						return Boom.forbidden(error)
					})
			}
			return new Promise(pr)
		}
	}
]
