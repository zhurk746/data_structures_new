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
  <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<style>
#mapid { height: 760px; }
</style>
<body>
<div id="mapid"></div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
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
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF1MmxoMjZnazNwbW8ya2dsZTRtNyJ9.mJ1kRVrVnwTFNdoKlQu_Cw'
    }).addTo(mymap);
    var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

    for (var i=0; i<data.length; i++) {
        L.marker([data[i].mtglat, data[i].mtglong], {icon: greenIcon}).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
        
    }
    console.log(data[1]["meetings"][0]["day"])
    </script>
    </body>
    </html>`;


app.get('/', function(req, res) {
    res.send('<h3>Kasey Zhuravlev Final Project</h3><ul><li><a href="/aa">AA Meetings Map</a></li><li><a href="/temperature">Temp Sensor Data</a></li><li><a href="/processblog">Restaurant Recommendations</a></li></ul>');
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
    var thisQuery = `SELECT mtgLat, mtgLong, json_agg(json_build_object('loc', mtgPlace, 'address', mtgAddress, 'name', mtgName, 'day', mtgDay, 'types', mtgTypeOf, 'shour', mtgStartTime)) as meetings
                 FROM aaMeetings 
                 WHERE mtgDay = ` + '\'' + dayy2 + '\'' + 
                 `GROUP BY mtgLat, mtgLong
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
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
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
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});
//});