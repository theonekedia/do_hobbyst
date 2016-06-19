'use strict';

var returnObject = require('../shared/returnObject')

var eventsModel = require('../../models/events')

class eventsComp {

  constructor(name) {
    this.name = name
  }

  getLiveEvents() {

    var returnObj = returnObject

    return eventsModel.find({})
    .then(function(eventsArray) {

      if(eventsArray.length === 0) {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'events live none'

      } else {
        returnObj.status = 'OK'
        returnObj.data = eventsArray
        returnObj.error = ''
      }

      return returnObj
    })
  }
}

module.exports = eventsComp