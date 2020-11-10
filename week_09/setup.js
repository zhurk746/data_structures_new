const { Client } = require('pg'),
        dotenv = require('dotenv');

// AWS RDS POSTGRESQL INSTANCE
dotenv.config();
var db_credentials = new Object();
db_credentials.user = 'zhurk746';
db_credentials.host = 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});