const {Client} = require('pg'),
      dotenv = require('dotenv'),
      async = require('async');

dotenv.config(); 
let db_credentials = {
    host: 'data-structures.cjoiyyanmepr.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'zhurk746',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

let addressesForDb = [{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"120 W 69TH ST New York NY ","latLong":{"lat":"40.7756982","long":"-73.9810333"}},{"streetAddress":"422 W 57TH ST New York NY ","latLong":{"lat":"40.7682311","long":"-73.9868768"}},{"streetAddress":"164 W 74TH ST New York NY ","latLong":{"lat":"40.7796117","long":"-73.9801807"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"144 W 90TH ST New York NY ","latLong":{"lat":"40.7898068","long":"-73.9723737"}},{"streetAddress":"141 W 73RD ST New York NY ","latLong":{"lat":"40.7789036","long":"-73.9799533"}},{"streetAddress":"4 W 76TH ST New York NY ","latLong":{"lat":"40.7788736","long":"-73.9745891"}},{"streetAddress":"221 W 107TH ST New York NY ","latLong":{"lat":"40.8017795","long":"-73.9665393"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"215 W 82ND ST New York NY ","latLong":{"lat":"40.7852818734432","long":"-73.9771060064311"}},{"streetAddress":"601 W 114TH ST New York NY ","latLong":{"lat":"40.8069051","long":"-73.965058"}},{"streetAddress":"CENTRAL PARK WEST AND 76TH ST New York NY ","latLong":{"lat":"40.6639307188879","long":"-73.9382749875207"}},{"streetAddress":"5 W 63RD ST New York NY ","latLong":{"lat":"40.7708644","long":"-73.9806413"}},{"streetAddress":"4 W 76TH ST New York NY ","latLong":{"lat":"40.7788736","long":"-73.9745891"}},{"streetAddress":"160 CENTRAL PARK W New York NY ","latLong":{"lat":"40.7787712","long":"-73.9743066"}},{"streetAddress":"152 W 66TH ST New York NY ","latLong":{"lat":"40.7744405","long":"-73.9838262"}},{"streetAddress":"3 W 95TH ST New York NY ","latLong":{"lat":"40.7912379","long":"-73.9655109"}},{"streetAddress":"251 W 80TH ST New York NY ","latLong":{"lat":"40.7848713","long":"-73.9800524"}},{"streetAddress":"111 W 71ST ST New York NY ","latLong":{"lat":"40.7769516","long":"-73.9795507"}},{"streetAddress":"5 W 63RD ST New York NY ","latLong":{"lat":"40.7708644","long":"-73.9806413"}},{"streetAddress":"5 W 63RD ST New York NY ","latLong":{"lat":"40.7708644","long":"-73.9806413"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"26 W 84TH ST New York NY ","latLong":{"lat":"40.7844228","long":"-73.9716168"}},{"streetAddress":"200 W 97TH ST New York NY ","latLong":{"lat":"40.7946604892952","long":"-73.9699229082063"}},{"streetAddress":"141 W 73RD ST New York NY ","latLong":{"lat":"40.7789036","long":"-73.9799533"}},{"streetAddress":"218 W 108TH ST New York NY ","latLong":{"lat":"40.8021037","long":"-73.9658778"}},{"streetAddress":"125 W 104TH ST New York NY ","latLong":{"lat":"40.7985878","long":"-73.9649967"}},{"streetAddress":"236 W 73RD ST New York NY ","latLong":{"lat":"40.7796494","long":"-73.982239"}},{"streetAddress":"165 W 105TH ST New York NY ","latLong":{"lat":"40.7996866","long":"-73.9657282"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"2504 BROADWAY New York NY ","latLong":{"lat":"40.7927534","long":"-73.972842"}},{"streetAddress":"405 W 114TH ST New York NY ","latLong":{"lat":"40.7946083","long":"-73.9358608"}},{"streetAddress":"368 W END AVE New York NY ","latLong":{"lat":"40.783225","long":"-73.9817572"}},{"streetAddress":"225 W 99TH ST New York NY ","latLong":{"lat":"40.7964452","long":"-73.9694226"}},{"streetAddress":"251 W 100TH ST New York NY ","latLong":{"lat":"40.7977791","long":"-73.9709911"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"26 W 84TH ST New York NY ","latLong":{"lat":"40.7844228","long":"-73.9716168"}},{"streetAddress":"5 W 63RD ST New York NY ","latLong":{"lat":"40.7708644","long":"-73.9806413"}},{"streetAddress":"552 W END AVE New York NY ","latLong":{"lat":"40.78931","long":"-73.9773114"}},{"streetAddress":"164 W 74 ST New York NY ","latLong":{"lat":"40.7796117","long":"-73.9801807"}},{"streetAddress":"340 W 85TH ST New York NY ","latLong":{"lat":"40.7887343","long":"-73.9798639"}},{"streetAddress":"368 W END AVE New York NY ","latLong":{"lat":"40.783225","long":"-73.9817572"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"5 W 63RD ST New York NY ","latLong":{"lat":"40.7708644","long":"-73.9806413"}},{"streetAddress":"131 W 72ND ST New York NY ","latLong":{"lat":"40.7780247","long":"-73.9798344"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"30 W 68TH ST New York NY ","latLong":{"lat":"40.7740859","long":"-73.979107"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}},{"streetAddress":"263 W 86TH ST New York NY ","latLong":{"lat":"40.7887918","long":"-73.9772649"}},{"streetAddress":"306 W 102ND ST New York NY ","latLong":{"lat":"40.7992334","long":"-73.9710638"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"26 W 84TH ST New York NY ","latLong":{"lat":"40.7844228","long":"-73.9716168"}},{"streetAddress":"595 COLUMBUS AVE New York NY ","latLong":{"lat":"40.7879892","long":"-73.9707609"}},{"streetAddress":"306 W 102ND ST New York NY ","latLong":{"lat":"40.7992334","long":"-73.9710638"}},{"streetAddress":"213 W 82ND ST New York NY ","latLong":{"lat":"40.7760114","long":"-73.9550312"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"152 W 71ST ST New York NY ","latLong":{"lat":"40.7774259","long":"-73.9812051"}},{"streetAddress":"160 CENTRAL PARK W New York NY ","latLong":{"lat":"40.7787712","long":"-73.9743066"}},{"streetAddress":"207 W 96TH ST New York NY ","latLong":{"lat":"40.7945161","long":"-73.9710419"}}]

async.eachSeries(addressesForDb, function(value, callback) {
    let client = new Client(db_credentials);
    client.connect();

    // When mixing variables into a query, place them in a `values` array and then refer to those 
    // elements within the `text` portion of the query using $1, $2, etc.
    let query = {
      text: "INSERT INTO aalocations VALUES($1, $2, $3)",
      values: [value.streetAddress, value.latLong.lat, value.latLong.long]
    };

    client.query(query, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    setTimeout(callback, 1000);
});