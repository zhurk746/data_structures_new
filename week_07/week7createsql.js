const {Client} = require('pg'),
      dotenv = require('dotenv');

// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
let db_credentials = {
    host: 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'zhurk746',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table (using ` quotes to break into multiple lines):
let query = `CREATE TABLE aaMeetings (
mtgName varchar(100),
mtgDay varchar(100),
mtgStartTime time with time zone, 
mtgEndTime time with time zone, 
mtgTypeOf varchar(80),
specialInt varchar(80),
mtgPlace varchar(80),
mtgPlaceNotes varchar(300),
mtgZone varchar(2),
mtgAddress varchar(100),
detailsofAddress varchar(100),
mtgWheelchair boolean, 
mtgLat double precision,
mtgLong double precision
);`;

// Sample SQL statement to delete a table:
//let query = "DROP TABLE aaMeetings;";

client.query(query, (err, res) => {
    if (err) { throw err; }

    console.log(res);
    client.end();
});