from flask import Flask, jsonify
from getInstance import getWordOfTheDay

app = Flask(__name__)

# "http://127.0.0.1:5000/login"
@app.route('/login', methods=['GET'])
def login():
    return "Login Hogya."

# "http://127.0.0.1:5000/get_word_of_the_day"
@app.route('/get_word_of_the_day', methods=['GET'])
def getNewWord():
    data = {
        "newWord":getWordOfTheDay()
    }
    return jsonify(data)

# debug is True so we don't have to start the server again after 
# making any change
app.run(debug=True) # start the server.
