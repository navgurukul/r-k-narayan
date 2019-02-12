const fs = require('fs');
const async = require('async');
//[2,3,4,65,7,8]
let randomChoice = (arr) => {
    let randomNumber = arr.length * Math.random()
    let final_number = Math.floor(randomNumber)
    return arr[final_number];
}
exports.randomChoice = randomChoice
//wt = advb,jj
let word_type = (wt) => {
    wt = wt.toLowerCase()
    if (wt["vb"]) {
        return "Verb"
    } else if (wt['nn']) {
        return "Noun"
    } else if (wt['jj']) {
        return "Adjective"
    }
    return wt
}

let get_sentence = (word) => {
    //creating and returning a new promise which will be reject or resolve in sometime
    return new Promise((resolve, reject) => {
        //yha pe hum hin.txt file ko read kar rhe hai fir uska data get krne k liye callback ka use kar rhe hai
        fs.readFile('hin.txt', function (err, data) {
            //agr wo file read ni kar paya to err mei usk file na read krne ka reason ayega other wise err ki null hogi and same as for data
            if (err) throw err;
            //data to pehle string mie convert kia and fir usko next line character(\n) se split isse hume data ek array mie milega
            let lines = data.toString().split("\n");
            //lines mei wo hi element hone chahiye jisme humar word argument exist karta ho
            lines = lines.filter(x => x.includes(word));
            if (lines.length == 0) return ""
            let line = randomChoice(lines)
            return resolve(line)
        });
    })
}


let randomLine = (file_name) => {
    return new Promise((resolve, reject) => {
        // "Retrieve a random line from a file"
        fs.readFile(file_name, function (err, data) {
            if (err) throw err;
            let lines = data.toString().split("\n");
            let line = randomChoice(lines)
            return resolve(line)
        });
    })
}


let getDictionary = (heading, text) => {
    let word_dict = {}
    word_dict['heading'] = heading
    word_dict['text'] = text
    return word_dict
}

exports.getWordOfTheDay = () => {
    return new Promise((resolve, reject) => {
        let wordOfTheDay = [];
        if (Math.random() > 0.7) {
            randomLine('en-hi-dict-sen.txt')
                .then((result) => {
                    let line = result.split(',')
                    wordOfTheDay.push(getDictionary("Word of the Day", line[1]))
                    wordOfTheDay.push(getDictionary("Meaning", line[0]))
                    wordOfTheDay.push(getDictionary("Sentence Usage", line[2]))
                    return resolve(wordOfTheDay)
                })
                .catch((er) => {
                    console.log(er, "err")
                    return reject(er)
                })

        } else if (Math.random() > 0.4) {
            randomLine('tagged_words.txt')
                .then(async (result) => {
                    let line = result.split(',')
                    wordOfTheDay.push(getDictionary("Word of the Day", line[0]))
                    wordOfTheDay.push(getDictionary("Word Type", word_type(line[1].trim())))
                    let sentence = await get_sentence(line[0])
                    if (sentence) {
                        let s = sentence.trim().split('\t')
                        wordOfTheDay.push(getDictionary("Sentence", s[0]))
                        wordOfTheDay.push(getDictionary("Translation", s[1]))
                        return resolve(wordOfTheDay)
                    }
                })
                .catch((er) => {
                    console.log(er, "err")
                    return reject(er)
                })
        } else {
            randomLine('en-hi-dict-sen.txt')
                .then(async (result) => {
                    let line = result.split(',')
                    let hword = line[0]
                    let eword = line[1].trim()
                    let sentence = await get_sentence(eword)
                    wordOfTheDay.push(getDictionary("Word of the Day", eword))
                    wordOfTheDay.push(getDictionary("Meaning", hword))
                    if (sentence) {
                        let s = sentence.trim().split('\t')
                        wordOfTheDay.push(getDictionary("Sentence", s[0]))
                        wordOfTheDay.push(getDictionary("Translation", s[1]))
                        return resolve(wordOfTheDay)
                    }
                })
                .catch((er) => {
                    console.log(er, "err")
                    return reject(er)
                })
        }
    })
}