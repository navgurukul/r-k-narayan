const request = require('request');
var fs = require('fs');
var cron = require('node-cron');
 



fs.readFile('./body.json', function (err, data) {
    if (err) throw err;
    let content = data.toString().split("\n")

cron.schedule('* * * * * *', () => {
    const options = {  
        url: 'https://cliq.zoho.com/api/v2/bots/dailyenglishwords/incoming?authtoken=4a6aea80e2420999dc3e16f9e1b4b528',
        method: 'POST',
        headers: {
            'content-type': 'application/json' 
        },
        body:content
    };


    request(options, function(err, res, body) {  
        let json = JSON.parse(body)
        
            console.log('running a task every minute',json);
              
        
        });

    });
});
