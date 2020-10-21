const fs = require('fs'),
      cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let Info = []; 
$('td').each(function(i, elem) {
    var html = $(elem).html();
    var split1 = html.split("<br/>");
    
    //if (split1.length < 6 || split1[2].indexOf("<") >= 0) {
      //  return;
    //}
    var meetingInfo = split1[0].trim();
    
    var split2 = meetingInfo.split("<br>");
    if (split2[0].indexOf("<a") >= 0) {
      return;
   }
   if (split2[0].indexOf("<h4") >= 0) {
      return;
   }
   let messy = split2
    let tidy = messy.map(str => str.trim())
    let tidyFinal=tidy.map(str=> str.split(/ <b>.*<\/b> /))
    let finalInfo=tidyFinal.filter(el => {
  return el != null && el != '';
});
    //let scrubbedInfo=finalInfo.map(str=> str.replace("<b>",""))
   //var infoShort = split2[0].trim();
   /*var split3=nameShort.split("-");
   
    var Title=split3[0].trim();

   var split4 = Title.split("<b>");
   var finalTitle = split4[1].trim();
    
    if (finalTitle== "") {
        return;
    }*/
    Info.push(finalInfo);
});

console.log(Info);
// write the addresses for each AA meeting in zone 6 to a text file, one per line
//fs.writeFileSync('meetingNamezone6.txt', Names.join("\n")); 