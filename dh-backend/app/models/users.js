'use strict';

// Initialize mongoose and its schema object

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    dropDups: true
  },
  points: {
    type: Number,
    required: true
  },
  bids: [new Schema({
    eventsId: {
      type: String,
      required: true
    },
    bidId: {
      type: String,
      required: true
    }
  }, {
    _id: false
  })]
},
  {
    collection: 'users',
    minimize: false,
    timestamps: true
  })

// Now we create a model for the above schema
var Users = mongoose.model('Teams', usersSchema)

// make this available to our Node applications
module.exports = Users