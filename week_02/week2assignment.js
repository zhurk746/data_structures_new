// npm install cheerio

const fs = require('fs'),
      cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let Address = []; 
$('td').each(function(i, elem) {
    var html = $(elem).html();
    var split1 = html.split("<br>");
    if (split1.length < 3 || split1[2].indexOf("<") >= 0) {
        return;
    }
    var fullAddress = split1[2].trim();
    
    var split2 = fullAddress.split(",");
    var address = split2[0].trim();
    
    var split3 = address.split(".");
    var scrubbedAddress = split3[0].trim();
    
    if (scrubbedAddress == "") {
        return;
    }
    Address.push(scrubbedAddress);
});

// write the addresses for each AA meeting in zone 6 to a text file, one per line
fs.writeFileSync('Address.txt', Address.join("\n"));