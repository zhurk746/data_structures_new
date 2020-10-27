const fs = require('fs'),
      cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let content = fs.readFileSync('m06.txt');

// parse `content` into a cheerio object
let $ = cheerio.load(content);

let meetings=[];
$('div table tbody tr').each(function(i, elem) {
    let infoJSON={};
    //let meetingInfo=$('.detailsBox', this).text().trim();
    //split on series of n and t common to all 
    let meetingScrub=$('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]', this).html();
    let split1=meetingScrub.split("\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\t\n\t\t\t\t\t");
    let messy = split1.map(x => x.trim());
    let Info = []; 
    Info.push(messy);
    //console.log(Info);
    for (let i=0; i<Info.length; i++){
        for (let j=0; j<Info[i].length; j++){
            let tidy=Info[i][j].replace('\n\t\t\t \t\t\t<br>\n                    \t<br>', '').replace( /(<([^>]+)>)/ig,'').split(/s From | to | Meeting Type |Special Interest /i);
            let tidyFinal=tidy.map(str => str.trim());
            
            
        let mtgDay=tidyFinal[0];
         let mtgStartTime=tidyFinal[1];
            let mtgEndTime=tidyFinal[2];
            let mtgTypeOf=tidyFinal[3];
            let specialInterest=tidyFinal[4];
            
            infoJSON['mtgDay']=mtgDay;
            infoJSON['mtgStartTime']=mtgStartTime;
            infoJSON['mtgEndTime']=mtgEndTime;
            infoJSON['mtgTypeOf']=mtgTypeOf;
            infoJSON['specialInterest']=specialInterest;
            
        }
        meetings.push(infoJSON); 
    }
});
console.log(meetings);
    //let tidy=messy.map(str=> str.split(/ <b>.*<\/b> /))
    //let finalInfo=tidyFinal.filter(el => {
  //return el != null && el != '';
//});
    //var html = $(elem).html();
    //var split1 = html.split(".detailsBox");
    
    /*if (split1.length < 3 || split1[2].indexOf("<") >= 0) {
       return;
    }*/
    //var meetingInfo = split1[0].trim();
    
   /* var split2 = meetingInfo.split("</td>");
    var messy=split2[0].trim()
    var split3=messy.split('td[style="border-bottom:1px solid #e3e3e3;width:350px;"')
    var details=split3[0].trim()
    var split4=details.split('\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    ')
    
    
    //var split3=messy.split("\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    ")
    //var tidy=split3.map(x=>x.trim())
   
   var detailsTrim=split4.map(str=>str.trim());
   if (detailsTrim.indexOf("<a href") >= 0) {
      return;
   }
   if (detailsTrim.indexOf("<h4 style") >= 0) {
      return;
   }
   
   var scrubbedInfo=detailsTrim[0].trim()
  /* */
    //let scrubbedInfo=finalInfo.map(str=> str.replace("<b>",""))
   /*var nameShort = split2[0].trim();
   var split3=nameShort.split("-");
   
    var Title=split3[0].trim();

   var split4 = Title.split("<b>");
   var finalTitle = split4[1].trim();
    
    if (finalTitle== "") {
        return;
    }*/

    //var split1 = html.split(" <td style='border-bottom:1px solid #e3e3e3;width:350px;");
    //var messy=split1[0].trim()
    //var split2=messy.split("\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    ")
    //var cleanup=split2[0].trim()

//console.log(Info);
// write the addresses for each AA meeting in zone 6 to a text file, one per line
//fs.writeFileSync('meetingNamezone6.txt', Names.join("\n")); 