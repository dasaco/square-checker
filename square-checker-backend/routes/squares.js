var express = require('express');
var path = require('path');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var fs = require('fs');

module.exports = io => {
	io.sockets.on("connection", socket => {
		let squareCount = 0;
		let squarePoints = [];

		const getFiles = (callback) => {
			fs.readdir(appDir + '/data', (err, files) => {
				let filesArray = [];
			  files.forEach(file => {
					filesArray.push(file);
			  });
				return callback(filesArray);
			});
		};

		socket.on('RefreshFileList', callback => {
			return callback(getFiles((filesArray) => socket.emit('FilesLoaded', { filesArray })));
		});

		socket.on('CountSquares', (points, callback) => {

			let oldLength = points.length;
			let duplicates = false;

			points = points.filter((thing, index, self) => self.findIndex((t) => {return t.x === thing.x && t.y === thing.y; }) === index);

			if(oldLength != points.length) {
				duplicates = true;
			}

			squareCount = 0;

			let r = 4;
			let data = [];
			checkSquares(points, data, 0, points.length - 1, 0, r);

			return callback({squarePoints, duplicates});
		});

		socket.on('GetFromFile', (data, callback) => {

			let invalidNumbers = false;
			let duplicates = false;

			let { fileName, currentPoints } = data;

			let pointsArray = [];

			fs.readFile(appDir + '/data/' + fileName, 'utf8', (err,data) => {
				if (err) {
					return console.log(err);
				}
				splitData = data.split(/\n/g).filter(String);
				splitData.forEach(element => {
					var els = element.split(" ");
					if(isNumeric(els[0]) & isNumeric(els[1])) {
						pointsArray.push(
							{
								x: els[0],
								y: els[1]
							}
						);
					} else {
						invalidNumbers = true;
					}
				});

				let totalElementsLength = pointsArray.length + currentPoints.length;
				let cut = false;

				if(totalElementsLength >= 9999) {
					pointsArray = pointsArray.splice(0, 10000 - currentPoints.length);
					cut = true;
				}

				pointsArray = pointsArray.concat(currentPoints);

				let oldLength = pointsArray.length;
				pointsArray = pointsArray.filter((thing, index, self) => self.findIndex((t) => {return t.x === thing.x && t.y === thing.y; }) === index);

				if(pointsArray.length != oldLength) {
					duplicates = true;
				}

				return callback({ pointsArray, cut, invalidNumbers, duplicates });
			});
		});

		socket.on('DeleteFile', (fileName, callback) => {
			fs.unlink(appDir + '/data/' + fileName, err => {
			    if(err) {
			        return console.log(err);
			    }

					fs.readdir(appDir + '/data', (err, files) => {
						let filesArray = [];
					  files.forEach(file => {
							filesArray.push(file);
					  });
						return callback(filesArray);
					});
			});


		});

		socket.on('SaveToFile', (points, fileName, callback) => {

			let fileText = '';

			points.forEach(point => {
				fileText += point.x + " " + point.y + "\n";
			});

			var re = /(?:\.([^.]+))?$/;

			if(re.exec(fileName)[1] != 'txt') {
				fileName += '.txt';
			}

			fs.writeFile(appDir + '/data/' + fileName, fileText, err => {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("The file was saved!");

					fs.readdir(appDir + '/data', (err, files) => {
						let filesArray = [];
					  files.forEach(file => {
							filesArray.push(file);
					  });
						return callback(filesArray);
					});
			});
		});

		const isNumeric = n => {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		const vectorDistance = (first, second) => {
			return (first.x - second.x)*(first.x - second.x) +
							 (first.y - second.y)*(first.y - second.y);
		};

		const isSquare = (p1, p2, p3, p4) => {
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

		const checkSquares = (arr, data, start, end, index, r) => {
			if (index == r)
			{
				let p1 = data[0];
				let p2 = data[1];
				let p3 = data[2];
				let p4 = data[3];
				if(isSquare(p1, p2, p3, p4)) {
					squareCount++;
					squarePoints.push({p1, p2, p3, p4});
					return;
				}
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
