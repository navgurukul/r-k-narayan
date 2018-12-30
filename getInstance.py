import random

def word_type(wt):
    wt = wt.lower()
    if "vb" in wt:
        return "Verb"
    elif "nn" in wt:
        return "Noun"
    elif "jj" in wt:
        return "Adjective"
    return wt

def get_sentence(word):
    lines = open('hin.txt').readlines()
    lines = filter(lambda x:word in x, lines)
    if not lines:
        return ""
    return random.choice(lines)

def randomLine(file_object):
    "Retrieve a random line from a file, reading through the file once"
    lineNum = 0
    selected_line = ''

    while 1:
        aLine = file_object.readline(  )
        if not aLine: break
        lineNum = lineNum + 1
        # How likely is it that this is the last line of the file?
        if random.uniform(0,lineNum)<1:
            selected_line = aLine
    file_object.close(  )
    return selected_line

if random.random()>0.7:
    line = randomLine(open("en-hi-dict-sen.txt")).split(',')
    print "Word of the Day : ", line[1]
    print "Meaning : ", line[0]
    print "Sentence Usage : ", line[2].strip()

elif random.random() > 0.4:
    line = randomLine(open("tagged_words.txt")).split(", ")
    print "Word of the Day : ", line[0]
    print "Word Type : ", word_type(line[1].strip())
    sentence = get_sentence(line[0])
    if sentence:
        s = sentence.strip().split('\t')
        print "Sentence : ", s[0]
        print "Translation : ", s[1]

else:
    line = randomLine(open("en-hi-dict.txt")).split(",")
    hword = line[0]
    eword = line[2].strip()
    sentence = get_sentence(eword)
    print "Word of the Day : ", eword
    print "Meaning : ", hword
    if sentence:
        s = sentence.strip().split('\t')
        print "Sentence : ", s[0]
        print "Translation : ", s[1]