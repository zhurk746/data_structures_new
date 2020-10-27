"use strict";

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv')
      var esformatter = require('esformatter');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';

// geocode addresses
let meetingsData = [];

let addresses = JSON.parse(fs.readFileSync('allaaMeetingsparsed.json', 'utf8'));
// let addresses = JSON.parse(fs.readFileSync('data/finalJSON/test.json', 'utf8'));

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    
    let query = {
      streetAddress: value.mtgAddress.address,
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
        console.log(tamuGeo['FeatureMatchingResultType'], streetAddress, lat, long, apiRequest);

        // create a JSON array for the latLng values
        value.latLong = {};
        // pass lat and long into the original JSON object
        value.latLong.lat =lat;
        value.latLong.lng = long;
        
        //push this JSON object into the meetingData array
        meetingsData.push(value);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
   
}, function() {
    var codeStr = JSON.stringify(meetingsData);
    var formattedCode = esformatter.format(codeStr);
    fs.writeFileSync('allaaMeetingsgeocoded.json', formattedCode);
    // fs.writeFileSync('data/finalJSON/test.json', formattedCode);
    //console.log('*** *** *** *** ***');
    console.log(`Number of meetings: ${meetingsData.length}`);
});