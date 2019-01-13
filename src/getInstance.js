const fs = require('fs');
const async = require('async');

let randomChoice = (arr) => {
    return arr[Math.floor(arr.length * Math.random())];
}

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
    return new Promise((resolve, reject) => {
        fs.readFile('hin.txt', function (err, data) {
            if (err) throw err;
            let lines = data.toString().split("\n");
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