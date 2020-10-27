const fs = require('fs'),
      cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let meetingNames = []; 
//cleaner
$('div table tbody tr').each(function(i, elem) {
        //let meetingJSON = {};
        let mtgPlaceName = $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]', this).html().replace(/[\t\n]/g,'').split('<br>');
        let mtgPlaceTrim = mtgPlaceName.map(x=>x.trim());
        
        
        let finalTitle = mtgPlaceTrim[1].replace(/(<([^>]+)>)/ig,'');
//old attempts
/*$('td').each(function(i, elem) {
    var html = $(elem).html();
    var split1 = html.split("<br>");
    if (split1.length < 3 || split1[2].indexOf("<") >= 0) {
        return;
    }
    var meetingName = split1[1].trim();
    
    var split2 = meetingName.split("-");
    var nameShort = split2[0].trim();
   var split3=nameShort.split("-");
   if (split3[0].indexOf("</b") >= 0) {
       return;
   }
    var Title=split3[0].trim();

   var split4 = Title.split("<b>");
   var finalTitle = split4[1].trim();*/
    
    if (finalTitle== "") {
        return;
    }
    meetingNames.push(finalTitle);
});
console.log(meetingNames)
//console.log(Names);
// write the addresses for each AA meeting in zone 6 to a text file, one per line
//fs.writeFileSync('meetingNamezone6.txt', Names.join("\n")); 