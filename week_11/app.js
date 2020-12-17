var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');

const indexSource = fs.readFileSync("templates/sensor.txt").toString();
var template = handlebars.compile(indexSource, { strict: true });

const pbSource = fs.readFileSync("templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'zhurk746';
db_credentials.host = 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com'; 
db_credentials.database = 'aa';
db_credentials.password = 'ta143hoe';
db_credentials.port = 5432;
//db_credentials.mapbox= 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF1MmxoMjZnazNwbW8ya2dsZTRtNyJ9.mJ1kRVrVnwTFNdoKlQu_Cw';

// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="styles.css?v=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
       crossorigin=""/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
       crossorigin=""/>
</head>
<style>
#mapid { height: 760px; width: 80%; float: right}
.popupCustom .leaflet-popup-tip,
.popupCustom .leaflet-popup-content-wrapper {
      background: #080808;
    color: #ffffff;
    font-size: 11px;
}
.mapkey {width: 20%; height: 100%; float: left}
.legend { list-style: none; font-family:sans-serif;}
.legend li { float: none; margin-right: 30px; }
.legend span { border: 1px solid #ccc; float: left; width: 12px; height: 12px; }
/* your colors */
.legend .beginner { background-color: #ffd500; }
.legend .openmeeting { background-color: #647476; }
.legend .closed { background-color: #080808; }
.legend .bigbook { background-color: #3580db; }
.legend .stepmeeting { background-color: #a20eb5; }
</style>
<body style="background-color:#d4f3c5;">
<div class="mapkey">
<h2 style="font-family:sans-serif; color:#080808; font-size:24px;"> All AA Meetings in Manhattan: </h2>
<p style="font-family:sans-serif; font-size: 14px;">Each marker on the map to the right represents an available AA meeting. Clusters represent a multitude of meetings that occur at the same location. Toggle and select any marker or marker cluster to find details regarding an Alcoholics Anonymous Meeting in your preferred Manhattan location. 
Markers are color coded according to meeting type. Reference the legend below for further information.</p>
    <ul class="legend">
    <li><span class="beginner"></span>Beginner Meeting</li>
    <li><span class="openmeeting"></span>Open Discussion Meeting</li>
    <li><span class="closed"></span>Closed Discussion Meeting</li>
    <li><span class="bigbook"></span>Big Book Meeting</li>
    <li><span class="stepmeeting"></span>Step Meeting</li>
</ul>
</div>
<div id="mapid"></div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    opacity: .50,
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF1MmxoMjZnazNwbW8ya2dsZTRtNyJ9.mJ1kRVrVnwTFNdoKlQu_Cw'
    }).addTo(mymap);
    
    var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var customOptions =
    {
    'maxWidth': '400',
    'width': '200',
    'className' : 'popupCustom',
    };
    for (var i=0; i<data.length; i++) {
    var aaMarkers=L.markerClusterGroup();
    for (var j=0; j<data[i].meetings.length; j++){
   var customPopup='<b>'+data[i]["meetings"][j]["name"] + '</b>' + '<br>' +data[i]["meetings"][j]["address"] + '<br>' +'<p> Meeting Begins: </p>' + data[i]["meetings"][j]["day"] + '<br>'+ data[i].local_time;
    if (data[i]["meetings"][j]["types"]=="B = Beginners meeting"){
        
       aaMarkers.addLayer(L.marker([data[i].mtglat, data[i].mtglong], {icon: goldIcon}).bindPopup(customPopup, customOptions)).addTo(mymap);
    } else if (data[i]["meetings"][j]["types"]=="S = Step meeting"){
       
       aaMarkers.addLayer(L.marker([data[i].mtglat, data[i].mtglong], {icon: violetIcon}).bindPopup(customPopup, customOptions)).addTo(mymap); 
    } else if (data[i]["meetings"][j]["types"]=="OD = Open Discussion meeting"){
       
        aaMarkers.addLayer(L.marker([data[i].mtglat, data[i].mtglong], {icon: greyIcon}).bindPopup(customPopup, customOptions)).addTo(mymap);
    } else if (data[i]["meetings"][j]["types"]=="C = Closed Discussion meeting"){
       
        aaMarkers.addLayer(L.marker([data[i].mtglat, data[i].mtglong], {icon: blackIcon}).bindPopup(customPopup, customOptions)).addTo(mymap);
    } else if (data[i]["meetings"][j]["types"]=="BB = Big Book meeting"){
       
         aaMarkers.addLayer(L.marker([data[i].mtglat, data[i].mtglong], {icon: blueIcon}).bindPopup(customPopup, customOptions)).addTo(mymap);
    } 
    }    
    };
    </script>
    </body>
    </html>`;


app.get('/', function(req, res) {
    res.send('<h3>Kasey Zhuravlev Final Projects- Data Structures 2020</h3><ul><li><a href="/aa">AA Meetings Map</a></li><li><a href="/temperature">Temp Sensor Data</a></li><li><a href="/processblog">Covid Restaurant Blog</a></li></ul>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString(); 
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    var dayy2 = weekdays[dayy];


    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT mtgLat, mtgLong, json_agg(json_build_object('day', mtgDay, 'name', mtgName, 'address', mtgAddress, 'shour', mtgStartTime, 'types', mtgTypeOf)) as meetings,
                 TO_CHAR(TO_TIMESTAMP(mtgStartTime::TEXT, 'HH24:MI'),'HH12:MI:AM') as local_time
                 FROM aaMeetings 
                 GROUP BY mtgLat, mtgLong, mtgStartTime
                 ;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             sensorValue as avg_obs
             FROM sensorData
             WHERE sensorValue<200
             GROUP BY sensorday, avg_obs
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.end(template({ sensordata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
}); 

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    const async = require('async');

    var blogEntries=["1","2","3","4","6","7","8","9","10","11","12","13","14","15", "16", "17"]
    var queryResults = []; // array to hold all the posts we retrieve

    async.eachSeries(blogEntries, function(entryID, callback){
        // 
        // this function gets run once for each of the entry IDs in `blogEntries`
        // 
        var params = {
            TableName : "restaurantblog",
            KeyConditionExpression: "pk= :pk", // the query expression
            ExpressionAttributeValues: { // the query values
                ":pk": {N: entryID.toString()} // request a particular post
            }
        };

        dynamodb.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                throw (err);
            }
            else {
                // add the info for this post to the array collecting all our results
                queryResults.push(data.Items)
            }
            callback(); // move on to the next entryID
        });
    }, function(){
        // 
        // this function gets called once after all the queries have been completed
        // 
        console.log("retrieved:", queryResults)
        res.end(pbtemplate({ pbdata: JSON.stringify(queryResults)}));
    })

});

//serve static files in /public
app.use("/public",express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});
//});