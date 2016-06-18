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
  eventsId: {
    type: String,
    required: true
  },
  users: [new Schema({
    usersId: {
      type: String,
      required: true
    },
    bet: {
      type: Number,
      required: true
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