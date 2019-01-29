const getInstance = require('./getInstance')
const Boom = require('boom');
const knex = require('./knex')

module.exports = [
	{
		method: 'GET',
		path: '/get_word',
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
	},
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
				let final_response=[]
				knex("vb_words").select("word","e_meaning","h_meaning")
					.orderByRaw('rand()')
					.limit(1)
					.then((result) => {
						let word=result[0]
						final_response.push({"heading":"Word of the day","text":word['word']})
						final_response.push({"heading":"Meaning","text":word['h_meaning']})
						knex("sentences").select("sentence","h_translation")
						.where("sentence", 'like', '% '+ word['word']+' %')
						.orderByRaw('rand()')
						.limit(1)						
							.then((result1) => {
								
								let sentence = result1[0]
								final_response.push({"heading":"Sentence","text": sentence['sentence']})
								final_response.push({"heading":"Translation","text": sentence['h_translation']})
								let data={}
								data["newWord"] = final_response
								return resolve(h.response(data))

							})
							.catch((error) =>{
								return reject(Boom.forbidden(error))
							})
					})
					.catch((error) => {
						return reject(Boom.forbidden(error))
					})
					
			}
			return new Promise(pr)
		}
	},
	{

		method: 'GET',
		path: '/get_word_by_query',
		config: {
			description: 'get word of the day',
			notes: 'get word of the day',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) =>{
				const query = request.query
				let final_response = []
				knex('vb_words').select('word','e_meaning','h_meaning')
				 .where({
				 	word:query.word
				 })
				.then((result) => {
					let word=result[0]
						final_response.push({"heading":"Word of the day","text":word['word']})
						final_response.push({"heading":"Meaning","text":word['h_meaning']})
						knex("sentences").select("sentence","h_translation")
						.where("sentence", 'like', '% '+ word['word']+' %')
						.orderByRaw('rand()')
						.limit(1)						
							.then((result1) => {
								
								let sentence = result1[0]
								final_response.push({"heading":"Sentence","text": sentence['sentence']})
								final_response.push({"heading":"Translation","text": sentence['h_translation']})
								let data={}
								data["newWord"] = final_response
								return resolve(h.response(data))

							})
							.catch((error) =>{
								return reject(Boom.forbidden(error))
							})
				})
				.catch((error) => {
					return reject(Boom.forbidden(error))
	
				})			

			}
			return new Promise(pr)
		}
	},
	{
		method: 'GET',
		path: '/get_sentence_by_query',
		config: {
			description: 'get word of the day',
			notes: 'get word of the day',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) => {
				const query=request.query
				let final_response=[]
				//console.log(query.sentence)
				knex("sentences").select("sentence","h_translation")
				.where('sentence','like','%'+query.sentence+'%')
				.orderByRaw('rand()')
				.limit(1)
				.then((result1) => {
				if (result1.length !== 0) {
					
					
					let sentence = result1[0]
					final_response.push({"heading":"Sentence","text": sentence['sentence']})
					final_response.push({"heading":"Translation","text": sentence['h_translation']})

					return resolve(h.response(final_response))
				}
				else {
					return resolve("This sentence doesn't exist.")
				}

				})
				.catch((error) =>{
					return reject(Boom.forbidden(error))
				})
					
					
			}
			return new Promise(pr)
		}
	},

	{
		method: 'POST',
		path: '/post_sentence',
		config: {
			description: 'post word of the day',
			notes: 'post word of the day',
			tags: ['api']
		},
		handler: (request, h) => {
			let pr = (resolve, reject) => {
		
				let final_response=[]
				//console.log(query.sentence)
				knex("sentences").insert({
					sentence: request.payload.sentence,
					h_translation: request.payload.h_translation
				})
				
				.then((result1) => {

					return resolve("Successfully Posted.")


				})
				.catch((error) =>{
					return reject(Boom.forbidden(error))
				})
					
					
			}
			return new Promise(pr)
		}
	}
	
]
