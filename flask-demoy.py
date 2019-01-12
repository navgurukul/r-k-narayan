from flask import Flask, jsonify
from getInstance import getWordOfTheDay

app = Flask(__name__)

# "http://127.0.0.1:5000/login"
@app.route('/login', methods=['GET'])
def login():
    return "Login Hogya."

# "http://127.0.0.1:5000/get_word_of_the_day"
@app.route('/get_word_of_the_day', methods=['GET'])
def getNewWord(level=0):
    # level=0 don't use level
    # level between 1 to 5
    # return a word with larger length
    # 1 - upto 4 characters
    # 2 - upto 5 chars
    # 3 - upto 7 chars
    # 4 - upto 8 chars (higher probability)
    # 5 - all

    data = {
        "newWord":getWordOfTheDay()
    }
    return jsonify(data)

# debug is True so we don't have to start the server again after 
# making any change
app.run(debug=True) # start the server.
