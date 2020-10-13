const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = {
    host: 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'zhurk746',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
var thisQuery = "SELECT address, lat, long FROM aalocations WHERE lat>40;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        // use console.table rather than console.log to display the structure of the arrays
        console.table(res.rows);
        client.end();
    }
}); 

