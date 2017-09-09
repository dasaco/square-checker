var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

var app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");
	try {
    socket.emit('SquareFound', { text: 'Socket called in app.js' });
  } catch (error) {
    console.error(`Socket Error: ${error.code}`);
  }
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

var squares = require('./routes/squares')(io);
app.use('/squares', squares);

module.exports = app;
