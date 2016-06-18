'use strict';

// Initialize mongoose and its schema object

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var playersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  }
},
  {
    collection: 'players',
    minimize: false,
    timestamps: true
  })

// Now we create a model for the above schema
var Players = mongoose.model('Players', playersSchema)

// make this available to our Node applications
module.exports = Players