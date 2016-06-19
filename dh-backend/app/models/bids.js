'use strict';

// Initialize mongoose and its schema object

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var bidsSchema = new Schema({
  ques: {
    type: String,
    required: true,
    trim: true
  },
  ans: {
    type: String,
    default: null
  },
  eventsId: {
    type: String,
    required: true
  },
  users: [new Schema({
    usersId: {
      type: String,
      default: null
    },
    bet: {
      type: String,
      default: null
    }
  }, {
    _id: false
  })
  ]
},
  {
    collection: 'bids',
    minimize: false,
    timestamps: true
  })

// Now we create a model for the above schema
var Bids = mongoose.model('Bids', bidsSchema)

// make this available to our Node applications
module.exports = Bids