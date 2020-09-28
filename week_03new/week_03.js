"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
//let addresses = ["207 West 96th St", "120 West 69th St", "422 West 57th St"];
/*let addresses= ['207 West 96th Street',
'120 West 69th Street',
'422 West 57th Street',
'164 West 74th Street',
'207 West 96th Street',
'144 West 90th Street',
'141 West 73rd Street',
'4 West 76th Street',
'221 West 107th Street',
'207 West 96th Street',
'215 West 82nd Street',
'601 West 114th Street',
'Central Park West and 76th Street',
'5 West 63rd Street',
'4 West 76th Street',
'160 Central Park West',
'152 West 66th Street',
'3 West 95th Street',
'251 West 80th Street',
'111 West 71st Street',
'5 West 63rd Street',
'5 West 63rd Street',
'207 West 96th Street',
'26 West 84th Street',
'200 West 97th Street',
'218 West 108th Street',
'125 West 104th Street',
'141 West 73rd Street',
'236 West 73rd Street',
'165 West 105th Street',
'207 West 96th Street',
'207 West 96th Street',
'2504 Broadway',
'405 West 114th Street',
'368 West End Ave',
'225 West 99th Street',
'251 West 100th Street',
'207 West 96th Street',
'26 West 84th Street',
'5 West 63rd Street',
'552 West End Avenue',
'164 West 74 Street',
'340 West 85th Street',
'368 West End Avenue',
'152 West 71st Street',
'5 West 63rd Street',
'131 West 72nd Street',
'207 West 96th Street',
'152 West 71st Street',
'30 West 68th Street',
'207 West 96th Street',
'263 West 86th Street',
'306 West 102nd Street',
'152 West 71st Street',
'26 West 84th Street',
'595 Columbus Avenue',
'306 West 102nd Street',
'213 West 82nd Street',
'152 West 71st Street',
'152 west 71st street',
'152 West 71st Street',
'160 Central Park West',
'207 West 96th Street']*/
let addresses=JSON.parse(fs.readFileSync('Address.json', 'utf8'));


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

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        let streetAddress = tamuGeo.InputAddress.StreetAddress;
        let lat = tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude;
        let long = tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude;
        //console.log(tamuGeo['FeatureMatchingResultType'], streetAddress, lat, long);
        let newlatlongJSON = {};
        newlatlongJSON['streetAddress'] = streetAddress;
        newlatlongJSON['latLong'] = {};
        newlatlongJSON['latLong']['lat'] = lat;
        newlatlongJSON['latLong']['long'] = long;
        meetingsData.push(newlatlongJSON);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('week3_latlong.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});