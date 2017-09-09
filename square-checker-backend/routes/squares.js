var express = require('express');
var path = require('path');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var fs = require('fs');

module.exports = function(io) {
	io.sockets.on("connection", socket => {
		let squareCount = 0;
		let squarePoints = [];

		console.log('Squares.js connected');

		socket.on('CountSquares', (points, callback) => {

			squareCount = 0;

			let r = 4;
			let data = [];
			checkSquares(points, data, 0, points.length - 1, 0, r);

			return callback({squarePoints});
		});

		socket.on('GetFromFile', callback => {

			console.log(appDir + '/data/points.txt');

			let pointsArray = [];

			fs.readFile(appDir + '/data/points.txt', 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
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

				return callback({ pointsArray });
			});
		});

		socket.on('SaveToFile', (points, callback) => {

			let fileText = '';

			points.forEach(point => {
				fileText += point.x + " " + point.y + "\n";
			});

			fs.writeFile(appDir + '/data/points.txt', fileText, function(err) {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("The file was saved!");
					return callback({text: 'all good'});
			});
		});

		const vectorDistance = function(first, second) {
			return (first.x - second.x)*(first.x - second.x) +
							 (first.y - second.y)*(first.y - second.y);
		};

		const isSquare = function(p1, p2, p3, p4) {
				let d2 = vectorDistance(p1, p2);
				let d3 = vectorDistance(p1, p3);
				let d4 = vectorDistance(p1, p4);

				if (d2 == d3 && 2*d2 == d4)
				{
						let d = vectorDistance(p2, p4);
						return (d == vectorDistance(p3, p4) && d == d2);
				}

				if (d3 == d4 && 2*d3 == d2)
				{
						let d = vectorDistance(p2, p3);
						return (d == vectorDistance(p2, p4) && d == d3);
				}
				if (d2 == d4 && 2*d2 == d3)
				{
						let d = vectorDistance(p2, p3);
						return (d == vectorDistance(p3, p4) && d == d2);
				}

				return false;
		};

		const checkSquares = function(arr, data, start, end, index, r) {
			if (index == r)
			{
				let p1 = data[0];
				let p2 = data[1];
				let p3 = data[2];
				let p4 = data[3];
				if(isSquare(p1, p2, p3, p4)) {
					squareCount++;
					process.stdout.write('1');
					squarePoints.push({p1, p2, p3, p4});
					return;
				}
				process.stdout.write('.');
				return;
			}
			for (let i = start; i <= end && end - i + 1 >= r - index; i++)
			{
					data[index] = arr[i];
					checkSquares(arr, data, i+1, end, index+1, r);
			}
		};
	});

	return router;
}
