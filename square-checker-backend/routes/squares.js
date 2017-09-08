var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function(io) {
	io.on("connection", socket => {
		let squareCount = 0;

		socket.on('CountSquares', (points) => {
			console.log(points)

			let r = 4;
			let data = [];
			checkSquares(points, data, 0, points.length - 1, 0, r);
			console.log('ttttt');
			socket.emit('SquareFound', squareCount)
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
		}

		router.get('/', (req, res, next) => {
			res.send('Hello');
		});

		router.get('/get-from-file', (req, res, next) => {

			let pointsArray = [];

			fs = require('fs')
			fs.readFile(__dirname + '/../data/points.txt', 'utf8', function (err,data) {
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

				res.json(pointsArray);
			});
		});

		router.post('/render-points', (req, res) => {

			let points = req.body.points;

			let r = 4;
			let data = [];
			checkSquares(points, data, 0, points.length - 1, 0, r);

		});

		const checkSquares = function(arr, data, start, end, index, r) {
			if (index == r)
			{
				let p1 = data[0];
				let p2 = data[1];
				let p3 = data[2];
				let p4 = data[3];
				if(isSquare(p1, p2, p3, p4)) {
					squareCount++;
					console.log('true');
					return true;
				}
				console.log('false');
				return false;
			}
			for (let i = start; i <= end && end - i + 1 >= r - index; i++)
			{
					data[index] = arr[i];
					checkSquares(arr, data, i+1, end, index+1, r);
			}
		}
	});

	return router;
}
