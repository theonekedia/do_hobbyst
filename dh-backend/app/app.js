'use strict';

// Import node js modules
var https = require('https')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var jwtObj = require('jsonwebtoken')
var bunyan = require('bunyan')
var path = require('path')

// Load App configuration
var config = require('./config/config')

var mongooseOpt = require('./components/shared/mongooseOptions')

var mongoose = require('mongoose')

// Handle Mongoose connection/error
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db.uri)
})

mongoose.connection.on('error', function () {
  console.log('Mongoose default connection error ' + config.db.uri)
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

// Connect Mongo DB Database
mongoose.connect(config.db.uri)

// Initialize the express app
var app = express()

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')

//   if(req.method === 'OPTIONS') {
//     res.status(200).end()
//   } else {
//     next()
//   }
// })

// App express Configuration

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

app.use(cors())

app.set('serverHost', config.server.host)
app.set('serverPort', config.server.port)
app.set('serverUrl', config.server.url)

// Initializing various app modules

// Initialize the components
var components = require('./components/index')

app.use(function(req, res, next) {
  console.log('Hello')
  var newUrl = req.url.slice(4)
  req.url = newUrl
  next()
})

// Intialize the logging functionality
// var logger = bunyan.createLogger({
//   name:'homerungurus',
//   streams: [
//     {
//       level: 'info',
//       path: path.join(__dirname, '/logs/hrg.log')
//     }
//   ]
// })

//Initialize the route(controller)
require('./routes/routes')(app, express, jwtObj, config.jwt, components, mongooseOpt)

// JSON Vulnerability see angular $http doc
app.use(function(req, res, next) {
  res.body = ")]}',\n" + res.body

  next()
})

// Start the app with a given port no and mode
var env = process.env.NODE_ENV || 'development'

// var httpsOptions = {
//   key: fs.readFileSync(__dirname + '/cert/server.key'),
//   cert: fs.readFileSync(__dirname + '/cert/server.crt')
// }

// https.createServer(httpsOptions, app).listen(app.get('serverPort'), function () {
//   // Server and mode info
//   console.log('The homerungurus backend running on server: '
//               + app.get('serverHost')
//               + ' and the port is: '
//               + app.get('serverPort'))

//   console.log("The mode is: " + env)
// })

app.listen(app.get('serverPort'), function () {
  // Server and mode info
  console.log('The homerungurus backend running on server: '
              + app.get('serverHost')
              + ' and the port is: '
              + app.get('serverPort'))

  console.log("The mode is: " + env)
})