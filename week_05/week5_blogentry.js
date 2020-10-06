var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, date, entry, happy, iate) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.happy = {};
    this.happy.BOOL = happy; 
    if (iate != null) {
      this.iate = {};
      this.iate.SS = iate; 
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry(0, 'September 24, 2020', "Seamore's", false, ["tuna poke", "fish tacos"]));
blogEntries.push(new BlogEntry(1, 'September 27, 2020', "RedFarm", true, ["three chili cashew chicken", "crab dumplings","duck wide rice noodles"]));
blogEntries.push(new BlogEntry(2, "October 1, 2020", "Blind Tiger", true, ["nachos"] ));
blogEntries.push(new BlogEntry(3, 'October 2, 2020', "Carrol Place", true, ["arrancini", "orrechiette"]));
blogEntries.push(new BlogEntry(4, 'October 3, 2020', "27 Morton", true, ["pierogi", "braenwurst sandwich"]));
blogEntries.push(new BlogEntry(5, 'October 3, 2020', "John's on Bleecker", true, ["pepperoni and mushroom pizza", "margarita pizza"]));
blogEntries.push(new BlogEntry(6, 'October 4, 2020', "The Grey Dog", true, ["french toast"]));
blogEntries.push(new BlogEntry(7, 'September 18, 2020', "Fiaschatteria Pistoia", true, ["truffle pasta", "cacio e pepe"]));

console.log(blogEntries);

const async = require('async');
//const querystring = require('querystring');
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();
//var params= {}
//params.Item=blogEntries[3]
//params.TableName="processblog"
async.eachSeries(blogEntries, function(value, callback) {
  let params = {
  Item: value,
  TableName: "processblog"
};
dynamodb.putItem(params, function (err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }else{
    console.log(data); // successful response
}
callback(); // move on to the next blog entry
});
});


