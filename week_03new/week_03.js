// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


// geocode addresses
let meetingsData = [];
let addresses = "/week_03/Address.txt"

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
//console.log(query);
  //  })

    //construct a querystring from the `query` object's values and append it to the api URL
  /* async function getData () {
        const response= await fetch(API_URL);
        const location=await response.json();
        console.log(location) */
    
    let apiRequest = API_URL + API_KEY + querystring.stringify(query);
console.log(apiRequest);    


    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }
//console.log(apiRequest)
        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        meetingsData.push(tamuGeo);
});
    })

//this is where code breaks and Unhandle Promise Rejection Warning 

     /* sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('week_03/geoservices.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
}); */
