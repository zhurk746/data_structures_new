const fs = require('fs'),
      cheerio = require('cheerio');
      //async = require('async');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let meetings=[];
let place=[];
$('td').each(function(i, elem) {
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
    
    if (addressName == "") {
        return;
    }
    place.push(addressName);

let mtgNames=[];
$('td').each(function(i, elem) {
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
   var finalTitle = split4[1].trim();
    
    if (finalTitle== "") {
        return;
    }
    mtgNames.push(finalTitle);
    
    let zone6JSON={};
for (let i in place){
    //let postFix=("0" + index).slice(-63);
            //for (let j in mtgNames){
                zone6JSON['place']=place[i],
                zone6JSON['mtgName']=mtgNames[i];
            }
    meetings.push(zone6JSON);
//}
});
console.log(meetings[i]);
});

