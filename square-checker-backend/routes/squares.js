var express = require('express');
var path = require('path');
var router = express.Router();

var pointsArray = [];

fs = require('fs')
fs.readFile(__dirname + '/../data/points.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
	//splitData = data.replace(/\n/g," ").split(" ").filter(Number);
	splitData = data.split(/\n/g).filter(String);
	splitData.forEach(function(element) {
		var els = element.split(" ");
		pointsArray.push(
			{
				x: els[0],
				y: els[1]
			}
		);
	});

	console.log('Points from file: ');
	console.log(pointsArray);
});

router.get('/', function(req, res, next) {

	res.json(pointsArray);
});

module.exports = router;
