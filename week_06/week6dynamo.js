// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();
const async = require('async');

var blogEntries=["1","2","3","4","6","7","8","9","10","11"];

async.eachSeries(blogEntries, function(value,callback) {
let params = {
    TableName : "restaurantblog",
    KeyConditionExpression: "pk= :pk", // the query expression
    ExpressionAttributeValues: { // the query values
        ":pk": {N: value.toString()}
        //":minDate": {N: new Date("August 15, 2020").valueOf().toString()},
        //":maxDate": {N: new Date("October 30, 2020").valueOf().toString()},
    }
};
//console.log(params);

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
callback();
});
