'use strict';

// Initialize mongoose and its schema object

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var teamsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
},
  {
    collection: 'teams',
    minimize: false,
    timestamps: true
  })

// Now we create a model for the above schema
var Teams = mongoose.model('Teams', teamsSchema)

// make this available to our Node applications
module.exports = Teams