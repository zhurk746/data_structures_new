const fs = require('fs'),
      cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let Names = []; 
$('div table tbody tr').each(function(i, elem) {
        //let meetingJSON = {};
        let mtgPlaceName = $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]', this).html().replace(/[\t\n]/g,'');
        let split1=mtgPlaceName.split('<br>');
        let mtgPlaceTrim = split1.map(x=>x.trim());
        
        
        let place = mtgPlaceTrim[0].replace(/(<([^>]+)>)/ig,'');
/*$('td').each(function(i, elem) {
    var html = $(elem).html();
    var split1 = html.split("<br>");
    if (split1.length < 3 || split1[2].indexOf("<") >= 0) {
        return;
    }
    var meetingName = split1[0].trim();
    
    var split2 = meetingName.split(">");
    var nameShort = split2[1].trim();
   var split3=nameShort.split("</h4");
   if (split3[0].indexOf("</b") >= 0) {
       return;
   }
    var addressName=split3[0].trim();

   //var split3 = address.split(".");
   // var scrubbedAddress = split3[0].trim();*/
    
    if (place == "") {
        return;
    }
    Names.push(place);
});

console.log(Names);
// write the addresses for each AA meeting in zone 6 to a text file, one per line
//fs.writeFileSync('addressName.txt', Names.join("\n")); 