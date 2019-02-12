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
				const query = request.query
				let final_response=[]
				if (query.d_level == undefined ) {
					
				
					knex("vb_words").select("word","h_meaning")
					.whereNotIn("h_meaning" , "")
					.orderByRaw('rand()')
					.limit(1)
					.then((result) => {
						let word=result[0]
						// console.log(word)
						final_response.push({"heading":"Word of the day","text":word['word']})
						final_response.push({"heading":"Meaning","text":word['h_meaning']})

							knex("vb_sentences").select("sentence","h_translation")
							.where("sentence", 'like', '%'+ word['word']+'%')
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
									let data = {}
									data["newWord"] = final_response
									return resolve(h.response(data))

									// return reject(Boom.forbidden(error))
								})
					})
					.catch((error) => {
						return reject(Boom.forbidden(error))
					})
				}
				else{
					// console.log(query.d_level)
					knex("vb_words").select("word","e_meaning","h_meaning","d_level")
					.whereNotIn("h_meaning" , "")
					.where({
						"d_level":query.d_level
					})
					.orderByRaw('rand()')
					.limit(1)
					.then((result) => {
						let word=result[0]
						// console.log(word)
						final_response.push({"heading":"Word of the day","text":word['word']})
						final_response.push({"heading":"Meaning","text":word['h_meaning']})

							knex("vb_sentences").select("sentence","h_translation","d_level")
							.where({
								"d_level":query.d_level
							}).where("sentence", 'like', '%'+ word['word']+'%')
							.orderByRaw('rand()')
							.limit(1)						
								.then((result1) => {
									
									let sentence = result1[0]
									// console.log(sentence)
									final_response.push({"heading":"Sentence","text": sentence['sentence']})
									final_response.push({"heading":"Translation","text": sentence['h_translation']})
									let data={}
									data["newWord"] = final_response
									return resolve(h.response(data))
								})
								.catch((error) =>{
									let data = {}
									data["newWord"] = final_response
									return resolve(h.response(data))

									// return reject(Boom.forbidden(error))
								})
					})
					.catch((error) => {
						return reject(Boom.forbidden(error))
					})

				}
					
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
				.whereNotIn("h_meaning" , "")
				 .where({
				 	word:query.word
				 })
				.then((result) => {
					let word=result[0]
						final_response.push({"heading":"Word of the day","text":word['word']})
						final_response.push({"heading":"Meaning","text":word['h_meaning']})
						knex("vb_sentences").select("sentence","h_translation")
						.where("sentence", 'like', '% '+ word['word']+' %')
						.orderByRaw('rand()')
						.limit(1)						
							.then((result1) => {
							if (result1.length !== 0) {
								
								
								
								let sentence = result1[0]
								final_response.push({"heading":"Sentence","text": sentence['sentence']})
								final_response.push({"heading":"Translation","text": sentence['h_translation']})
								let data={}
								data["newWord"] = final_response
								return resolve(h.response(data))
							}else {
								return "This word doesn't exist."
							}
							})
							.catch((error) =>{
								let data = {}
								data["newWord"] = final_response
								return resolve(h.response(data))
								// return reject(Boom.forbidden(error))
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
				knex("vb_sentences").select("sentence","h_translation")
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
		
				//console.log(query.sentence)
				knex("vb_sentences").insert({
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
