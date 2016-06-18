'use strict';

// Initialize mongoose and its schema object

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var eventsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  }
},
  {
    collection: 'events',
    minimize: false,
    timestamps: true
  })

// Now we create a model for the above schema
var Events = mongoose.model('Events', eventsSchema)

// make this available to our Node applications
module.exports = Events