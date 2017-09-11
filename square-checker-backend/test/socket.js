var assert = require('assert');
var squares = require('../routes/squares');
var io = require('socket.io-client');
var expect = require('Chai').expect;

describe('Square Functions', function(){

	const endpoint = 'http://127.0.0.1:3001';
	const socket = io(endpoint);

	it('should find 1 square', function(done){

		const points = [
			{x: 0, y: 0},
			{x: 0, y: 10},
			{x: 10, y: 0},
			{x: 10, y: 10},
			{x: 5, y: 5},
		];

		socket.emit('CountSquares', points, (data) => {
			expect(data.squarePoints).to.have.lengthOf(1);
			done();
		});
	});

});
