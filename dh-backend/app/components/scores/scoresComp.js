'use strict';

var returnObject = require('../shared/returnObject')

var usersClass = require('../users/usersComp')

class scoresComp {

  constructor(name) {
    this.name = name
  }

  setScores(eventsId) {

  }

  getScores(usersId) {

    var usersObj = new usersClass('usersComponents')

    return usersObj.getUserBids(usersId)
  }

}

module.exports = scoresComp