let isVowel = (ch) => {
    return (ch == 'a' || ch == 'e' || 
    ch == 'i' || ch == 'o' || 
    ch == 'u') 
}

exports.calcDiff = (str) => {
    str = str.toLowerCase();
    var count_conso = 0
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element!= " " && !isVowel(element)) {
            count_conso+=1
        }
    }
    if (count_conso<=3) {
        return 1
        
    }
    else if (count_conso==4){
        return 2
    }
    else if (count_conso==5){
        return 3
    }
    else if (count_conso==6){
        return 4    
    }
    else if (count_conso>6){
        return 5        
    }
}


