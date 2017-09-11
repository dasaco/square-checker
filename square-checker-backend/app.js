var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');

var app = express();

const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

var squares = require('./routes/squares')(io);
app.use('/squares', squares);

module.exports = app;
