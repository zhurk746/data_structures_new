// npm install request
// mkdir data

"use strict"
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m01.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m01.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m02.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m02.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m03.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m03.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m04.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m04.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m05.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m05.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m06.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m06.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m07.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m07.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m08.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m08.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m09.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m09.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});

request('https://parsons.nyc/aa/m10.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/dataweek1/m10.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});
