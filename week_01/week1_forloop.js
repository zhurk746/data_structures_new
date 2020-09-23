// npm install request
// mkdir data

"use strict"
var request = require('request');
var fs = require('fs');

for (var index = 1; index <= 10; index++) {
    var filePostfix = ("0" + index).slice(-2);
    request('https://parsons.nyc/aa/m' + filePostfix + '.html', 
        function(postfix) {
            return function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    fs.writeFileSync(`${__dirname}/dataweek1/m` + postfix + `.txt`, body);
                } else{
                    console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
                }
            }
        }(filePostfix)
    );
}

