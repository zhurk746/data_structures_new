// npm install cheerio

const fs = require('fs'),
      cheerio = require('cheerio');
      var esformatter = require('esformatter');

// copied all scraped text from dataweek1 and set to variable array

var aaPages = ['m01.txt', 'm02.txt', 'm03.txt', 'm04.txt', 'm05.txt', 'm06.txt', 'm07.txt', 'm08.txt', 'm09.txt', 'm10.txt'];



// meeting details will be stored in this array where I plan to push JSON
let meetings = [];

for (let fileIndex = 0; fileIndex<aaPages.length; fileIndex++){
    //put meeting contents into variable
    let content = fs.readFileSync(aaPages[fileIndex]);
    let mtgAAZone = aaPages[fileIndex].toString().slice(-6, -4);
    
        // parse `content` into a cheerio object like in week 2
    let $ = cheerio.load(content,{
        normalizeWhitespace: true
    });
    
    //first part of table below with meeting place, name and address
    $('div table tbody tr').each(function(i, elem) {
        let meetingJSON = {};
        let mtgPlaceName = $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]', this).html().replace(/[\t\n]/g,'')
        let split1=mtgPlaceName.split('<br>');
        let mtgPlaceTrim = split1.map(x=>x.trim());
        
        
        let place = mtgPlaceTrim[0].replace(/(<([^>]+)>)/ig,'');
        
        let mtgName = mtgPlaceTrim[1].replace(/(<([^>]+)>)/ig,'');
        
        // // Splitting the addresses on a comma
        let address = mtgPlaceTrim[2].split(', ');
        
        // // replacing the final comma at the end of the string
        address = address.map(x => x.trim().replace(',', ''));
        
        // // creating a JSON ojbect that can hold the address to use for geocoding
        let addressJSON = {};
        // // adding New York, NY for geocode
        addressJSON['address'] = address[0];
        
        // //additional part of the address data 
        addressJSON['detailsofAddress'] = address[1];
        
        //get all meeting info in 2nd part of table like days it meets, times, special interests
        //split on this \n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    as it occurs in each part
        
        let meetingInfoDayTime = $('td[style="border-bottom:1px solid #e3e3e3;width:350px;"]', this).html()
        let split2=meetingInfoDayTime.split('\n\t\t\t \t\t\t<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    ');
        let meetingInfoDayTimeTrim = split2.map(x=>x.trim());
        
        let mtgInfo = []; // mtgDTT = meeting Day Time Type
        mtgInfo.push(meetingInfoDayTimeTrim);
         
         //set wheelchair as a boolean
         let wheelchair = $('span[style="color:darkblue; font-size:10pt;"]', this).html();
         let mtgWheelchair;
        if (wheelchair!= null){
            mtgWheelchair = true;
        } else {
            mtgWheelchair = false;
        }
        let allrandomDetails = $('.detailsBox', this).text().trim();
        
        for (let i=0; i<mtgInfo.length; i++){
            for (let j=0; j<mtgInfo[i].length; j++){
                let mtgInfoSplit = mtgInfo[i][j].replace('\n\t\t\t \t\t\t<br>\n                    \t<br>', '').replace( /(<([^>]+)>)/ig,'').split(/s From | to | Meeting Type |Special Interest /i);
                let mtgInfoTrim = mtgInfoSplit.map(x=>x.trim());
                let mtgDay = mtgInfoTrim[0];
                let mtgStartTime = mtgInfoTrim[1];
                let mtgEndTime = mtgInfoTrim[2];
                let mtgTypeOf = mtgInfoTrim[3];
                let specialInterest = mtgInfoTrim[4];
                //input values within arrays into JSON
                meetingJSON['mtgName'] = mtgName;
                meetingJSON['mtgDay'] = mtgDay;
                meetingJSON['mtgStartTime'] = mtgStartTime;
                meetingJSON['mtgEndTime'] = mtgEndTime;
                meetingJSON['mtgTypeOf'] = mtgTypeOf;
                meetingJSON['specialInt'] = specialInterest;
                meetingJSON['mtgPlace'] = place;
                meetingJSON['mtgPlaceNotes'] = allrandomDetails;
                meetingJSON['mtgZone'] = mtgAAZone;
                meetingJSON['mtgAddress'] = addressJSON;
                meetingJSON['mtgWheelchair'] = mtgWheelchair;
                
                
            }
        meetings.push(meetingJSON);
        }
    });
    }

// console.log(meetings);

//put the data into a json file 
// put the array with all meeting data into JSON and then format it using esformatter module
let allmeetingData = JSON.stringify(meetings);
let formattedCode = esformatter.format(allmeetingData);

// write the meeting data for each meeting to a json file
fs.writeFileSync('allaaMeetingsparsed.json', formattedCode);

//determine how many meetings 
console.log(`Meetings Length: ${meetings.length}`);
