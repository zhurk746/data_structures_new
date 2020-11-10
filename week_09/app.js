var request = require('request');
const { Client } = require('pg'),
        dotenv = require('dotenv');

dotenv.config();
// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'temp';
var device_url = 'https://api.particle.io/v1/devices/24001d001947393035313138/temp?access_token=cb6136b467441555700c9d8cd8f1157ba397dc71';

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zhurk746';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = {text: "INSERT INTO sensorData VALUES ($1, $2)",
                        values: [sv.result,sv.coreInfo.last_heard]
        };
        console.log(thisQuery); // for debugging

      //Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);