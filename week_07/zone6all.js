const fs = require('fs'),
      cheerio = require('cheerio');
      //async = require('async');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let zone6JSON={};
let meetings=[];
//let place=[];
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
    let place=split3[0].trim();
    
    if (place == "") {
        return;
    }

//let mtgNames=[];
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
   var mtgName = split4[1].trim();
    
    if (mtgName== "") {
        return;
    }
    //mtgNames.push(finalTitle);
    
    let Info = []; 
$('div table tbody tr').each(function(i, elem) {
    let meetingInfo=$('.detailsBox', this).text().trim();
    let meetingScrub=$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]', this).html().split('\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    ');
    let meetingTrim = meetingScrub.map(x=>x.trim());
    
    Info.push(meetingTrim);

    
   for (let i=0; i<Info.length, i++){
       for (let j=-; j<Info{i].length, j++){
           let InfoNew=Info[i][j]replace('\n\t\t\t \t\t\t<br>\n                    \t<br>', '').replace( /(<([^>]+)>)/ig,'').split(/s From | to | Meeting Type |Special Interest /i);
                let InfoNewTrim = InfoNew.map(x=>x.trim());
                let mtgDay = InfoNewTrim[0];
                let mtgStartTime = InfoNewTrim[1];
                let mtgEndTime = InfoNewTrim[2];
                let mtgTypeOf = InfoNewTrim[3];
                let mtgSpecialInterest = InfoNewTrim[4];
                
                zone6JSON['place']=place,
                zone6JSON['mtgName']=mtgName
                zone6JSON['mtgDay']=mtgDay
                zone6JSON['mtgStartTime']=mtgStartTime
                zone6JSON['mtgEndTime']=mtgEndTime
                zone6JSON['mtgTypeOf]'=mtgTypeOf
                zone6JSON['specialInterest']=mtgSpecialInterest
                
            }
    meetings.push(zone6JSON);
       }
//}
});
console.log(meetings);
//});

